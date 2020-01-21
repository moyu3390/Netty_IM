import {send,commands,packet,registerHandle} from '@/ws/ws.js';

function pySegSort(arr, empty) {
    if (!String.prototype.localeCompare)
        return null;
    var letters = "*abcdefghjklmnopqrstwxyz".split('');
    var en = "abcdefghjklmnopqrstwxyz".split('');
    var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
    var segs = [];
    var curr;
    letters.forEach(function (item, index) {
        curr = { letter: item, data: [] };
        arr.forEach(function (user, index2) {
            var item2=user.userName;
            var reg = new RegExp('[a-z]')
            var firstWord = item2.split('')[0].toLowerCase()
            if (reg.test(firstWord)) {
                if ((!en[index - 1] || en[index - 1].localeCompare(item2, "en") <= 0) && item2.localeCompare(en[index], "en") == -1) {
                    curr.data.push(user);
                }
            } else {
                if ((!zh[index - 1] || zh[index - 1].localeCompare(item2, "zh") <= 0) && item2.localeCompare(zh[index], "zh") == -1) {
                    curr.data.push(user);
                }
            }
        });
        if (empty || curr.data.length) {
            segs.push(curr);
            curr.data.sort(function (a, b) {
                return a.localeCompare(b, "zh");
            });
        }
    });
    return segs;
}



class resp { constructor(userId,userName) { this.userId = userId,this.userName=userName } }


var userList={list:[]};

function handler(resp){
    var list=pySegSort(resp.data)
    userList.list=list;
}
//注册处理方法
registerHandle(commands.get('getUserList'),handler)

function refreshList(){
    //组packet
    var p=new packet(commands.get('getUserList'),null,null)
    send(p)
}


export {pySegSort,userList,refreshList}