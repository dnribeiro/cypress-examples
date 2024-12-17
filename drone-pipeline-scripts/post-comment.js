const fs = require('fs');
const path = require('path');

const token = process.env.GITHUB_TOKEN;
const repo = process.env.DRONE_REPO_NAME; // Nome do repositório do Drone
const owner = process.env.DRONE_REPO_OWNER; // Nome do proprietário do repositório
const pull_number = process.env.DRONE_PULL_REQUEST; // Número da PR

// Caminho do relatório Cypress
const reportPath = path.resolve('./cypress/results/results.json');

async function postComment() {
  try {
    // Importar Octokit dinamicamente 
    const { Octokit } = await import("@octokit/rest"); 
    const octokit = new Octokit({ auth: token });
    // Validar se o arquivo existe
    if (!fs.existsSync(reportPath)) {
      throw new Error("Cypress report file not found!");
    }

    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

    // Criar corpo do comentário
    let commentBody = `### Cypress Test Results\n\n**Summary:**\n- Passed: ${report.totalPassed || 0}\n- Failed: ${report.totalFailed || 0}\n\n`;

    (report.tests || []).forEach((test) => {
      if (test.state === 'failed') {
        commentBody += `- **Test:** ${test.title}\n  - ❌ **Failed**\n`;
      }
    });

    if (!report.tests || report.tests.length === 0) {
      commentBody += "No tests were run.\n";
    }

    // Publicar comentário na PR
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: pull_number,
      body: commentBody,
    });

    console.log("Comment posted successfully.");
  } catch (error) {
    console.error("Failed to post comment:", error);
  }
}

postComment();
