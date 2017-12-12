# markdown流程图

标签（空格分隔）： markdown

---

```flow
st=>start: 开始
st2=>operation: 显示"插卡服务或无卡服务"界面
menu=>operation: 显示主菜单
op1=>inputoutput: 输入密码
op2=>inputoutput: 输入银行卡卡号
op3=>operation: 显示余额
op4=>inputoutput: 输入取款金额
op5=>operation: 确认取款
op6=>inputoutput: 输入对方卡号及转账金额
op7=>operation: 进行转账
op8=>inputoutput: 将钞票放入存钞口
op9=>operation: 确认存款金额
print=>inputoutput: 打印小票
goodBye=>inputoutput: 退卡
goodBye2=>operation: 显示服务结束界面
goodBye3=>operation: 显示选择"插卡服务或无卡服务"界面
cond1=>condition: 是否插入银行卡
cond2=>condition: 选择"查询余额"服务
cond3=>condition: 是否选择"取款"服务
cond4=>condition: 是否选择"转账"服务
cond5=>condition: 是否选择"存款"服务
cond6=>condition: 是否退卡
cond7=>condition: 是否退卡
cond8=>condition: 是否退卡
cond9=>condition: 是否退卡
cond10=>condition: 是否继续放钞
cond11=>condition: 是否打印小票
exit=>condition: 是否退卡
transCond=>condition: 是否转账成功
e=>end: 结束
st->st2->cond1->op1->menu->cond2
cond1(yes)->op1
cond1(no)->op2
cond2(yes)->op3->cond6
cond2(no)->cond3
cond3(yes)->op4->op5->cond7
cond3(no)->cond4
cond4(yes)->op6->op7->transCond
cond4(no)->cond5
cond5(yes)->op8->op9->cond10
cond5(no)->exit
cond6(yes)->goodBye->goodBye2->goodBye3->e
cond6(no)->menu
cond7(yes)->goodBye
cond7(no)->menu
cond8(yes)->goodBye
cond8(no)->menu
cond9(yes)->goodBye
cond9(no)->menu
cond10(yes)->op8
cond10(no)->cond11
cond11(yes)->print->menu
cond11(no)->cond9
transCond(yes)->cond8
transCond(no)->menu
exit(yes)->goodBye
exit(no)->menu
```


### 使用流程

程序框架
```flow
st=>start: 开始
st2=>inputoutput: 显示"插卡服务或无卡服务"界面
st3=>inputoutput: 显示"插卡服务或无卡服务"界面
iAtmCard=>inputoutput: 插入银行卡
niAtmCard=>inputoutput: 选择无卡服务
returnCard=>inputoutput: 取卡
id=>operation: 进行验证
serve1=>operation: 进行服务
serve2=>operation: 进行服务
cond1=>condition: 是否插入银行卡
whetherCon1=>condition: 是否结束服务
whetherCon2=>condition: 是否结束服务
e=>end: 结束
st->st2->cond1->iAtmCard
cond1(yes)->iAtmCard->id->serve1->whetherCon1
cond1(no)->niAtmCard->serve2->whetherCon2
whetherCon1(yes)->returnCard->st3->e
whetherCon1(no)->serve1
whetherCon2(yes)->st3
whetherCon2(no)->serve2
```

插卡服务
```flow
st=>start: 开始
iCard=>inputoutput: 插入银行卡
pw=>inputoutput: 输入密码
menu=>inputoutput: 显示服务菜单
showBalance=>inputoutput: 显示余额
pwJudge=>condition: 密码是否正确
pwContinue=>condition: 是否继续输入密码
select=>condition: 是否选择查询服务
getMoney=>condition: 是否选择取款服务
transfer=>condition: 是否选择转账服务
deposit=>condition: 是否选择存款服务
serve1=>operation: 执行服务
serve2=>operation: 执行服务
serve3=>operation: 执行服务
serve4=>operation: 执行服务
reServe=>condition: 是否取卡
returnCard=>inputoutput: 取卡
showInit=>inputoutput: 显示"插卡服务或无卡服务"界面
e=>end: 结束
st->iCard->pw->pwJudge
pwJudge(yes)->menu->select
pwJudge(no)->pwContinue
pwContinue(yes)->pw
select(yes)->serve1->reServe
select(no)->getMoney
getMoney(yes)->serve2
getMoney(no)->transfer
transfer(yes)->serve3
transfer(no)->deposit
deposit(yes)->serve4
serve2->reServe
serve3->reServe
serve4->reServe
reServe(yes)->returnCard->showInit->e
reServe(no)->menu
```

查询服务
```flow
st=>start: 开始
request1=>inputoutput: 显示余额
printCond=>condition: 是否打印当前余额信息
print=>inputoutput: 打印余额信息
e=>end: 结束
st->request1->printCond
printCond(yes)->print->e
printCond(no)->e
```

取款服务
```flow
st=>start: 开始
e=>end: 结束
inputNum=>inputoutput: 输入取款金额
getCond=>condition: 是否小于余额
getCash=>inputoutput: 进行取款
error=>inputoutput: 提示错误信息
getContinue=>condition: 是否结束取款服务
printCond=>condition: 是否打印取款信息
print=>inputoutput: 打印小票
st->inputNum->getCond
getCond(yes)->getCash->printCond
getCond(no)->error->getContinue
getContinue(no)->inputNum
getContinue(yes)->e
printCond(yes)->print
print->e
```

转账服务
```flow
st=>start: 开始
e=>end: 结束
inputID=>inputoutput: 输入转入账户卡号
idCond=>condition: 账户是否存在
error=>inputoutput: 提示错误信息
error2=>inputoutput: 提示错误信息
tC=>condition: 是否结束转账服务
tC2=>condition: 是否结束转账服务
inputCount=>inputoutput: 输入转账金额
countCond=>condition: 转账金额是否小于余额
transfer=>operation: 向指定用户转账指定金额
printCond=>condition: 是否打印转账信息
print=>inputoutput: 打印小票
st->inputID->idCond
idCond(yes)->inputCount->countCond
idCond(no)->error->tC
tC(yes)->e
tC(no)->inputID
countCond(yes)->transfer->printCond
countCond(no)->error2->tC2
tC2(yes)->e
tC2(no)->inputCount
printCond(yes)->print->e
printCond(no)->e
```

存款服务
```flow
st=>start: 开始
e=>end: 结束
reminder=>inputoutput: 提示"将钞票叠整齐放入存钞口"
put=>inputoutput: 用户将钞票放入存钞口
sure=>condition: 是否点击"结束存钞"按钮
recognize=>operation: 识别钞票
show1=>inputoutput: 显示已识别待存入钞票总额
show2=>inputoutput: 显示已识别待存入钞票总额
backCond=>condition: 是否有不能识别的钞票
back=>operation: 退回不能识别的钞票
rePut=>condition: 是否停止放钞
printCond=>condition: 是否打印存款信息
print=>inputoutput: 打印小票
st->reminder->put->sure
sure(yes)->recognize->backCond
sure(no)->put
backCond(yes)->back->show1->rePut
backCond(no)->show1
rePut(yes)->show2->printCond
rePut(no)->put
printCond(yes)->print->e
printCond(no)->e
```

无卡服务
```flow
st=>start: 开始
e=>end: 结束
serve1=>inputoutput: 显示无卡可选服务
depositCond=>condition: 是否选择无卡无折存款服务
reminder=>inputoutput: 提示"将钞票叠整齐放入存钞口"
put=>inputoutput: 用户将钞票放入存钞口
sure=>condition: 是否点击"结束存钞"按钮
recognize=>operation: 识别钞票
show1=>inputoutput: 显示已识别待存入钞票总额
show2=>inputoutput: 显示已识别待存入钞票总额
backCond=>condition: 是否有不能识别的钞票
back=>operation: 退回不能识别的钞票
rePut=>condition: 是否停止放钞
printCond=>condition: 是否打印存款信息
print=>inputoutput: 打印小票
inputID=>inputoutput: 输入待存入账户
idCond=>condition: 账户是否存在
serveContinue=>condition: 是否退出存款服务
st->serve1->depositCond
depositCond(yes)->inputID->idCond
depositCond(no)->e
idCond(yes)->reminder->put->sure
idCond(no)->serveContinue
serveContinue(yes)->e
serveContinue(no)->inputID
sure(yes)->recognize->backCond
sure(no)->put
backCond(yes)->back->show1->rePut
backCond(no)->show1
rePut(yes)->show2->printCond
rePut(no)->put
printCond(yes)->print->e
printCond(no)->e

```


## 使用指南

分为两大块，定义元素和连接元素

### 定义元素语法：

```
tag=>type: content:>url
```

* tag就是元素名
* type是这个元素的类型，有6种类型，分别为：
    * start # 开始
    * end # 结束
    * operation # 操作
    * subroutine # 子程序
    * condition # 条件
    * inputoutput # 输入或产出
* content就是在框框中要写的内容，注意type后的冒号与文本之间一定要有个空格。