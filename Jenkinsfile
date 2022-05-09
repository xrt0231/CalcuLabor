pipeline {
    agent any

    stages {
        stage('Pre-Build') {
            steps {
                echo "Build Started"
            }
        }

        stage('Change-folder') {
            steps {
                script {
                    dir('/home/ec2-user/mmem') {    
                        echo 'change folder'   
                        sh 'git pull'
                    } 
                }
            }
        }

        stage('Npm-nstall') {
            steps {
                script {
                    dir('/home/ec2-user/mmem'){
                        echo "npm install"
                        sh 'npm install' 
                    } 
                }
            }
        }

    }

    post { 
        success {
            echo "Build Success"
        }

        failure { 
            echo "Build Failed"
        }
    }
}
