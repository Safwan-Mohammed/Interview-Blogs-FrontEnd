pipeline {
    agent any
    environment {
        NETLIFY_AUTH_TOKEN = credentials('JENKINS_NETLIFY_AUTH')
        NETLIFY_SITE_ID = credentials('NETLIFY_SITE_ID')
    }
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:22-alpine3.20'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    node --version
                    npm --version
                    npm install vite
                    npm run build
                '''
            }
        }
        stage('Deploy') {
            agent {
                docker {
                    image 'node:22-alpine3.20'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm install netlify-cli
                    node_modules/.bin/netlify --version
                    node_modules/.bin/netlify status
                    node_modules/.bin/netlify deploy --dir=build --prod
                '''
            }
        }
    }
}