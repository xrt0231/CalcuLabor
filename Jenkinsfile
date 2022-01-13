node {
    stage('stage 1'){
        echo 'Deploy started...'
    }
    stage('stage 2'){
        steps{
            dir('/home/ec2-user/mmem'){
                sh 'git pull'
            }
        }
    }
    stage('npm install'){
        steps{
            dir('/home/ec2-user/mmem'){
                sh 'npm install'
            }
        }
    }
}
