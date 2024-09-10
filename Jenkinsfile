pipeline {
    agent any
    environment {
        NETLIFY_AUTH_TOKEN = credentials('JENKINS_NETLIFY_AUTH')
        NETLIFY_SITE_ID = credentials('NETLIFY_SITE_ID')
        IMAGE_NAME = "lightgaia/blogs-practice-images"
        TAG = "F1.0"
        DOCKERHUB_AUTH = credetials('JENKINS_DOCKER_HUB_AUTH')
        DOCKERHUB_USER = "lightgaia"
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
        stage('Push to DockerHub') {
            steps {
                script {
                    docker.build('${IMAGE_NAME}:${TAG}')
                    sh '''
                        docker login -u ${DOCKERHUB_USER} --password ${DOCKERHUB_AUTH}
                        docker push ${IMAGE_NAME}:${TAG}
                    '''
                }
            }
        }
    }
}