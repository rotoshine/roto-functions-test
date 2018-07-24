
import * as express from 'express'
import * as functions from 'firebase-functions'
import * as fs from 'fs'

const app = express()

app.get('/article/:articleId', (req, res) => {
  const { articleId } = req.params

  try {
    fs.readFile('./index.html', 'utf8', (err, htmlString) => {
      res.set('Content-Type', 'text/html')

      const title = `${articleId} 번 게시글 : Firebase + Functions Test`
      const description = `${title}에 대한 내용`
      const url = 'https://roto-functions-test.firebaseapp.com'

      const imageUrl = 'https://cdn.freebiesupply.com/logos/large/2x/react-native-firebase-1-logo-png-transparent.png'

      let replacedHTML = htmlString.replace(
        /<title>(.*?)<\/title>/,
        `<title>${title}</title>`
      )
      
      replacedHTML = replacedHTML.replace(
        /<\/head>/,
        `
        <meta name="description" content="${description}" />
        <meta name="url" content="${url}" />
        <meta name="identifier-URL" content="${url}">  
        <meta property="og:title" content="${title}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="${url}" />
        <meta property="og:image" content="${imageUrl}" />
        <meta property="og:site_name" content="Firebase + Functions Test" />
        <meta property="og:description" content="${description}" />
        <meta name="twitter:card" content="summary_large_image" />  
        <meta name="twitter:creator" content="@winterwolf0412" />          
        </head>
        `
      )
      res.send(new Buffer(replacedHTML))
    })
  } catch (e) {    
    res.redirect('/')
  }
})

export const articleDetail = functions.https.onRequest(app)
