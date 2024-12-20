const fs = require('fs');
const path = require('path');

const token = process.env.GITHUB_TOKEN; // Token github do secret
const repo = process.env.DRONE_REPO_NAME; // Nome do repositório do Drone
const owner = process.env.DRONE_REPO_OWNER; // Nome do proprietário do repositório
const pull_number = process.env.DRONE_PULL_REQUEST; // Número da PR

// Caminho do relatório Cypress
const reportPath = path.resolve('./cypress/results/results.json');

async function postComment() {
  try {
    // Importar Octokit dinamicamente 
    const { Octokit } = await import("@octokit/rest"); 
    
    // Debug log to check if token exists (don't log the actual token)
    console.log('Token exists:', !!token);

    // Initialize Octokit with proper authentication
    const octokit = new Octokit({
      auth: `token ${token}`, // Add 'token' prefix
      baseUrl: 'https://api.github.com'
    });

    // Validar se o arquivo existe
    if (!fs.existsSync(reportPath)) {
      throw new Error("Cypress report file not found!");
    }

    const results = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

    // Criar corpo do comentário
    let commentBody = `### Cypress Test Results\n\n**Summary:**\n- Passed: ${results.stats.passes || 0}\n- Failed: ${results.stats.failures || 0}\n\n`;

    (results.results || []).forEach((result) => {
      (result.suites || []).forEach((suite) => {
        (suite.tests || []).forEach((test) => {
          if (test.state === 'passed'){
            commentBody += `- **Test:** ${test.title}:  ✅ **Passed**\n`;
          }
          else {
            commentBody += `- **Test:** ${test.title}:  ❌ **Failed**\n`;
          }
        })
      })
      
    });

    if (!results.results || results.results.length === 0) {
      commentBody += "No tests were run.\n";
    }

    // Publicar comentário na PR
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: pull_number,
      body: commentBody,
    });

    console.log("Comment posted successfully.\n" + commentBody);
  } catch (error) {
    console.error("Failed to post comment. Full error details:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    
    // Caso o erro seja HTTP
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }

    // Garantir que o erro esteja visível nos logs do Drone
    throw error;
  }
}

postComment();
