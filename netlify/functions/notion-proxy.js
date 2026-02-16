const { Client } = require('@notionhq/client');

const allowedOrigins = [
  'https://clickszy.com'
];

exports.handler = async function(event, context) {

  const origin = event.headers.origin;
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: 'OK'
    };
  }

  // Get secrets from environment variables
  const NOTION_TOKEN = process.env.NOTION_INTEGRATION_TOKEN;
  const BLOG_DB_ID = process.env.NOTION_BLOGPOSTS_DATASOURCE_ID;
  const CASESTUDIES_DB_ID = process.env.NOTION_CASESTUDIES_DATASOURCE_ID;

  if (!NOTION_TOKEN || !BLOG_DB_ID || !CASESTUDIES_DB_ID) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Missing Notion environment variables.' })
    };
  }

  const notion = new Client({ auth: NOTION_TOKEN });

  // Determine which database to query based on a query parameter
  const type = event.queryStringParameters && event.queryStringParameters.type;
  let database_id;
  if (type === 'case-studies' || type === 'casestudies') {
    database_id = CASESTUDIES_DB_ID;
  } else {
    database_id = BLOG_DB_ID;
  }
  try {
    const response = await notion.databases.query({
      database_id
    });
    console.log('Notion API response:', JSON.stringify(response, null, 2));

    let mappedResults = [];
    if (type === 'case-studies' || type === 'casestudies') {
      // Map to CaseStudy structure
      mappedResults = response.results.map((result) => {
        const props = result.properties || {};
        let featuredImage = '';
        const files = props['Featured Image']?.files || [];
        if (files.length > 0) {
          if (files[0].type === 'external') {
            featuredImage = files[0].external.url;
          } else if (files[0].type === 'file') {
            featuredImage = files[0].file.url;
          }
        }
        return {
          id: result.id,
          slug: props['Slug']?.rich_text?.[0]?.plain_text || '',
          icon: props['Icon']?.rich_text?.[0]?.plain_text || '',
          industry: props['Industry']?.select?.name || '',
          company: props['Company']?.rich_text?.[0]?.plain_text || '',
          title: props['Title']?.title?.[0]?.plain_text || '',
          context: props['Context']?.rich_text?.[0]?.plain_text || '',
          challenge: (props['Challenge']?.rich_text?.map((c) => c.plain_text).join('\n').split('\n').filter(Boolean)) || [],
          approach: props['Approach']?.rich_text?.[0]?.plain_text || '',
          actions: (props['Actions']?.rich_text?.map((a) => a.plain_text).join('\n').split('\n').filter(Boolean)) || [],
          outcomes: (props['Outcomes']?.rich_text?.map((o) => o.plain_text).join('\n').split('\n').filter(Boolean)) || [],
          proves: props['Proves']?.rich_text?.[0]?.plain_text || '',
          featuredImage,
          status: props['Status']?.status?.name || '',
          statusColor: props['Status']?.status?.color || '',
        };
      });
    } else {
      // Map to BlogPost structure
      mappedResults = response.results.map((result) => {
        const props = result.properties || {};
        let featuredImage = '';
        const files = props['Featured Image']?.files || [];
        if (files.length > 0) {
          if (files[0].type === 'external') {
            featuredImage = files[0].external.url;
          } else if (files[0].type === 'file') {
            featuredImage = files[0].file.url;
          }
        }
        const excerpt = props['Excerpt']?.rich_text?.[0]?.plain_text || '';
        return {
          id: result.id,
          slug: props['Slug']?.rich_text?.[0]?.plain_text || '',
          title: props['Blog Title']?.title?.[0]?.plain_text || '',
          excerpt,
          content: excerpt, // Use excerpt as content
          featuredImage,
          category: props['Category']?.select?.name || '',
          author: {
            name: props['Author Name']?.rich_text?.[0]?.plain_text || '',
            avatar: props['Author Avatar']?.url || '',
          },
          publishedDate: props['Published Date']?.date?.start || '',
          readingTime: props['Reading Time']?.rich_text?.[0]?.plain_text || '',
          url: result.url || '',
          status: props['Status']?.status?.name || '',
          statusColor: props['Status']?.status?.color || '',
          rawProperties: props // include all raw properties for debugging
        };
      });
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(mappedResults)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
