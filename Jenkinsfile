pipeline {
    agent any
    // environment {
    //     CI = 'true'
    //     RED = '#FF0000'
    //     YELLOW = '#FFFF00'
    //     GREEN = '#008000'
    // }

    stages {
        stage('Pre-Build') {
            steps {
                echo "Build Started"
            }
        }

        stage('Change-folder') {
            steps {
                script {
                    sh 'pwd'
                    dir('/home/ec2-user/mmem') {    
                        echo 'change folder'   
                        sh 'pwd'
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
