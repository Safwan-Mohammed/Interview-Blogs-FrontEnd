pipeline {
    agent any
    environment {
        NETLIFY_AUTH_TOKEN = credentials('JENKINS_NETLIFY_AUTH')
        NETLIFY_SITE_ID = credentials('NETLIFY_SITE_ID')
        IMAGE_NAME = "lightgaia/blogs-practice-images"
        TAG = "F1.0"
        DOCKERHUB_CREDENTIALS_PSW = credentials('JENKINS_DOCKER_HUB_AUTH')
        DOCKERHUB_CREDENTIALS_USR = 'lightgaia'
    }
    stages {
        stage('Build App') {
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
        stage('Build Docker Image') {
            steps {
                    sh 'docker build -t $IMAGE_NAME:$TAG .'
                }
        }
        stage('Dockerhub Login') {
            steps {
                sh "docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}"           
            }
        }
        stage('Push Image'){
            steps {
                sh 'docker push $IMAGE_NAME:$TAG'
            }
        }
        stage('Deploy'){
            steps{
                sh "echo 'Deploy Success!'"
            }
        }
    }
}