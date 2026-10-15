import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { SiteData } from '@/data/defaultSiteData';

const execAsync = promisify(exec);
const dataFilePath = path.join(process.cwd(), 'src', 'data', 'site-content.json');

const DEFAULT_OWNER = 'baeditor84-pixel';
const DEFAULT_REPO = 'shameem-ahmad';
const DEFAULT_BRANCH = 'main';

// GET: Check Git & GitHub status
export async function GET() {
  try {
    let lastCommit = '';
    let currentBranch = DEFAULT_BRANCH;
    let gitAvailable = false;

    try {
      const { stdout: branchOut } = await execAsync('git rev-parse --abbrev-ref HEAD', {
        cwd: process.cwd(),
      });
      currentBranch = branchOut.trim() || DEFAULT_BRANCH;

      const { stdout: logOut } = await execAsync('git log -1 --pretty=format:"%h - %s (%cr)"', {
        cwd: process.cwd(),
      });
      lastCommit = logOut.trim();
      gitAvailable = true;
    } catch {
      gitAvailable = false;
    }

    const hasEnvToken = Boolean(process.env.GITHUB_TOKEN);

    return NextResponse.json({
      success: true,
      gitAvailable,
      branch: currentBranch,
      lastCommit,
      owner: process.env.GITHUB_OWNER || DEFAULT_OWNER,
      repo: process.env.GITHUB_REPO || DEFAULT_REPO,
      hasEnvToken,
    });
  } catch (error) {
    console.error('Git status error:', error);
    return NextResponse.json({ success: false, error: 'Failed to inspect git status' }, { status: 500 });
  }
}

// POST: Commit & Push to GitHub (Supports both local Git CLI and GitHub REST API for Vercel)
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      data,
      commitMessage = 'chore(admin): live content update from Admin Panel',
      githubToken: customToken,
      owner = process.env.GITHUB_OWNER || DEFAULT_OWNER,
      repo = process.env.GITHUB_REPO || DEFAULT_REPO,
      branch = process.env.GITHUB_BRANCH || DEFAULT_BRANCH,
      deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL,
    } = body;

    const token = customToken || process.env.GITHUB_TOKEN;

    // 1. If data is provided, save it to local file first
    let jsonContent = '';
    if (data && typeof data === 'object') {
      jsonContent = JSON.stringify(data, null, 2);
      try {
        fs.writeFileSync(dataFilePath, jsonContent, 'utf8');
      } catch (e) {
        console.warn('Could not write to local file (expected on Vercel serverless):', e);
      }
    } else if (fs.existsSync(dataFilePath)) {
      jsonContent = fs.readFileSync(dataFilePath, 'utf8');
    }

    if (!jsonContent) {
      return NextResponse.json({ success: false, error: 'No content data found to sync' }, { status: 400 });
    }

    let syncResult: { method: string; details: any } = { method: 'none', details: null };

    // 2. Try Local Git CLI first (works on developer / local machine with Git credentials)
    let localGitSuccess = false;
    try {
      // Stage only the data file
      await execAsync('git add src/data/site-content.json', { cwd: process.cwd() });
      
      // Check if there are changes to commit
      const { stdout: statusOut } = await execAsync('git status --porcelain src/data/site-content.json', {
        cwd: process.cwd(),
      });

      if (statusOut.trim().length > 0) {
        const escapedMsg = commitMessage.replace(/"/g, '\\"');
        await execAsync(`git commit -m "${escapedMsg}"`, { cwd: process.cwd() });
      }

      // Push to remote GitHub
      const { stdout: pushOut } = await execAsync(`git push origin ${branch}`, { cwd: process.cwd() });
      localGitSuccess = true;
      syncResult = {
        method: 'local_git',
        details: pushOut.trim() || 'Pushed successfully to GitHub origin/' + branch,
      };
    } catch (localGitErr: any) {
      console.warn('Local git CLI push failed or not in local environment, trying GitHub API:', localGitErr?.message);
    }

    // 3. If local Git CLI didn't succeed, use GitHub REST API (works everywhere, including Vercel Serverless)
    if (!localGitSuccess) {
      if (!token) {
        return NextResponse.json({
          success: false,
          error:
            'Git CLI is not available in this environment and no GitHub Personal Access Token was provided. Please provide a GitHub Token in Admin Settings to enable cloud sync.',
        }, { status: 400 });
      }

      // Fetch existing file SHA from GitHub API
      const fileApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/src/data/site-content.json?ref=${branch}`;
      let sha: string | undefined;

      const getRes = await fetch(fileApiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'Shameem-Admin-Sync',
        },
      });

      if (getRes.ok) {
        const fileInfo = await getRes.json();
        sha = fileInfo.sha;
      }

      // Push new content to GitHub via API
      const base64Content = Buffer.from(jsonContent, 'utf8').toString('base64');
      const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/src/data/site-content.json`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'Shameem-Admin-Sync',
        },
        body: JSON.stringify({
          message: commitMessage,
          content: base64Content,
          branch,
          sha,
        }),
      });

      if (!putRes.ok) {
        const errorJson = await putRes.json().catch(() => ({}));
        return NextResponse.json({
          success: false,
          error: `GitHub API error: ${errorJson.message || putRes.statusText}`,
        }, { status: putRes.status });
      }

      const putData = await putRes.json();
      syncResult = {
        method: 'github_api',
        details: putData.commit?.html_url || 'Committed via GitHub REST API',
      };
    }

    // 4. If Vercel Deploy Hook is configured, trigger it for instant rebuild
    let deployTriggered = false;
    if (deployHookUrl) {
      try {
        const hookRes = await fetch(deployHookUrl, { method: 'POST' });
        deployTriggered = hookRes.ok;
      } catch (hookErr) {
        console.warn('Vercel Deploy Hook trigger error:', hookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully pushed to GitHub! Vercel is now updating your live website.',
      syncResult,
      vercelDeployTriggered: deployTriggered,
      branch,
      repo: `${owner}/${repo}`,
    });
  } catch (error: any) {
    console.error('Git Sync API Error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Internal sync error' }, { status: 500 });
  }
}
