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
                    dir('/home/ec2-user/mmem') {    
                        echo 'change folder'   
                        sh 'pwd'
                        sh 'git pull'
                        //sh 'npm install'
                    } 
                }
            }
        }
    }
    //     stage('Install') {
    //         steps {
    //             script {
    //                 if (env.BRANCH_NAME == 'dev') {
    //                     echo "dev install"
    //                     sh 'npm --prefix /home/foritech/Projects/KK-BV/Auth-Service install'
    //                 } 
    //             }
    //         }
    //     }
    //     stage('Build') {
    //         steps {
    //             script {
    //                 if (env.BRANCH_NAME == 'dev') {    
    //                     echo 'dev build'            
    //                     sh 'npm --prefix /home/foritech/Projects/KK-BV/Auth-Service run build'
    //                 } 
    //             }         
    //         }
    //     }

    //     stage('Remove Docker Image') {
    //         steps {
    //             script {
    //                 if (env.BRANCH_NAME == "qa") { 
    //                     sh 'sudo docker rmi kk-bv-member-image-qa || true'
    //                 }
    //                 if (env.BRANCH_NAME == "dev") { 
    //                     sh 'sudo docker rmi kk-bv-member-image-dev || true'
    //                 }
    //             }
    //         }
    //     }
    // }

    post { 
        success {
            echo "Build Success"
        }

        failure { 
            echo "Build Failed"
        }
    }
}
