@echo off
echo "========git add .=========="
git add .
echo "========�޸�����������=========="
git status
set /p input=����ǰ�˱����ύ������
git commit -m %input%
git push git@github.com:Yzwcp/cloudbaseblog.git
pause