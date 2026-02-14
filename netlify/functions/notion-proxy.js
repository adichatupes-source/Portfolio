const { Client } = require('@notionhq/client');

exports.handler = async function(event, context) {
  // Get secrets from environment variables
  const NOTION_TOKEN = process.env.notion_integration_token;
  const BLOG_DB_ID = process.env.notion_blog_datasource_id;
  const CASESTUDIES_DB_ID = process.env.notion_casestudies_datasource_id;

  if (!NOTION_TOKEN || !BLOG_DB_ID || !CASESTUDIES_DB_ID) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing Notion environment variables.' })
    };
  }

  const notion = new Client({ auth: NOTION_TOKEN });

  // Determine which database to query based on a query parameter
  const type = event.queryStringParameters && event.queryStringParameters.type;
  let database_id;
  if (type === 'casestudies') {
    database_id = CASESTUDIES_DB_ID;
  } else {
    database_id = BLOG_DB_ID;
  }

  try {
    const response = await notion.databases.query({
      database_id
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response.results)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
