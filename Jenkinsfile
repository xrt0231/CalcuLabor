
pipeline{
    agent any
    stages{
        stage('stage 1'){
            echo 'Deploy started...'
        }
        stage('stage 2'){
            steps{
                dir('/home/ec2-user/mmem'){
                    sh 'git pull'
                    sh 'npm install'
                }
            }
        }
    }
}


