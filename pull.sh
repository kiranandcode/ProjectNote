#!/bin/bash
apt-get install git
chmod 400 /usr/src/app/id_rsa
eval $(ssh-agent -s)
ssh-add /usr/src/app/id_rsa
ssh -o StrictHostKeyChecking=no git@github.com
git remote set-url origin git@github.com:gopiandcode/COMP214P_UCL_Team6_ScenarioWeek.git
git checkout $BRANCH
git pull
