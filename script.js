// var size=40;
var row=41;
var col=81;
var start=420;
var finish=1500;
var maxi=10000;
var limit=1300;
var obstacles =new Array(row*col).fill(0);
var parent=new Array(row*col).fill(-1);
var time=new Array(col*row).fill(9999);
var divs=document.getElementsByClassName("unvisited")
var found=-1;
var weight=new Array(row*col).fill(0);
// var shouldIstart=-1;
var clr=1;
var speed=25;
var isRunning=-1;
// var elemnt=<span class="material-icons" style="font-size: 10px; color: black; display: inline-block; vertical-align: middle; line-height: normal;">check_circle</span>;


var myMaze=new Array(row);
for(var i=0;i<row;i++)myMaze[i]=new Array(col);
// var ct=0
var uv="whitesmoke";
var st="blue";
var fn="green";
var pth="yellow"
var obs="rgb(5, 80, 82)";
var src="blueviolet"




function rand(x)
{
    return Math.floor(Math.random()*(x))
}
function initialize()
{
    for(var i=0;i<row;i++)
    {
        for(var j=0;j<col;j++)
        {
            myMaze[i][j]='#'
        }
    }
}
function checkForBound(x,y)
{
    if(x<0 || y<0 || x>=row || y>=col)return 0;
    else return 1;
}
function recMazeGeneration(x,y)
{

    
    myMaze[x][y]=' '
    var dx=[-1,0,1,0];
    var dy=[0,1,0,-1];
    for(var i=0;i<4;i++)
    {
        var ran=rand(4);
        var temp=dx[ran];
        dx[ran]=dx[i];
        dx[i]=temp;

        temp=dy[ran];
        dy[ran]=dy[i];
        dy[i]=temp;
    }
    // console.log(dx)
    // console.log(dy)
    for(var i=0;i<4;i++)
    {
        
        var x1=x+2*dx[i];
        var y1=y+2*dy[i];
        if(checkForBound(x1,y1)==1 && myMaze[x1][y1]=='#')
        {
            // ct++;
            myMaze[x1-dx[i]][y1-dy[i]]=' ';
            recMazeGeneration(x1,y1);
        }
    }
    // return;

}
function getRandonStartFinish()
{
    setTimeout(function()
    {
        for(var i=0;i<parent.length;i++)parent[i]=-1;
        // for(var i=0;i<obstacles.length;i++)obstacles[i]=0;
        for(var i=0;i<time.length;i++)time[i]=9999;
        for(var i=0;i<row*col;i++)
        {
            if(obstacles[i]==0)divs[i].style.backgroundColor=uv;
            else if(obstacles[i]==1 && (i==start || i==finish))divs[i].style.backgroundColor=obs;
        }
    
    // divs[start].style.backgroundColor=uv;
    // divs[finish].style.backgroundColor=uv;
    start=rand(row*col);
    while(1)
    {
        if(obstacles[start]==0 && weight[start]==0)break;
        start=rand(row*col);

    }
    finish=rand(row*col);
    while(1)
    {   if(obstacles[finish]==0 && finish!=start)break;
        finish=rand(row*col);
    }
    },100)
}
function addObstacles()
{
    // console.log(this.style.backgroundColor)
    // console.log(this.className)
    if(this.style.backgroundColor==obs)
    {
        this.style.backgroundColor=uv;
        obstacles[this.id]=0;
        time[this.id]=0;
    }
    else
    {
        this.style.backgroundColor=obs;
        obstacles[this.id]=1;
        time[this.id]=9999;
    }
    //  console.log(this.style)
    // console.log(this.id)
}
function myloopforPath(i,path)
{
    // console.log(path);
    // console.log(k);
    setTimeout(function(){
        // document.getElementById('btn-visualize').innerHTML="Tracing Path";
        isRunning=1;
        divs[path[i]].style.backgroundColor=pth;
        divs[start].style.backgroundColor=st;
        divs[finish].style.backgroundColor=fn;
        i--;
        if(i>=0 && clr==1)
        {
            myloopforPath(i,path);
            // console.log(speed);
        }
        if(!(i>=0 && clr==1))
        {
            document.getElementById('btn-visualize').innerHTML="Visualize";
            isRunning=-1;
        }

    },speed)
}
function myloopforSearching(i,x,divs,k,path)
{
    // console.log(path)
    // console.log("Entered Searching");
    // console.log(clr);
    
    setTimeout(function(){
        // document.getElementById('btn-visualize').innerHTML="Running BFS";
        isRunning=1;
        // console.log(isRunning);
        for(var j=0;j<x[i].length;j++)
        {
            if(x[i][j]==finish)found=1;
            if(x[i][j]==start || x[i][j]==finish)continue;
            else divs[x[i][j]].style.backgroundColor=src;
            // divs[start].style.backgroundColor=st
            // divs[finish].style.backgroundColor=fn
            // divs[x[i][j]].style.transition="0.5s"
            // divs[x[i][j]].innerHTML=i;
        }
        i++;
        if(x[i].length!=0 && found==-1 && clr==1)
        {
            // if(document.getElementById('bfs-option').checked==true)document.getElementById('btn-visualize').innerHTML="Running BFS";
            myloopforSearching(i,x,divs,k,path);
        }
        if(found==-1)isRunning=-1;
        if(found==1)
        {
            
            // console.log(divs.length);
            // for(var it=0;it<divs.length;it++)if(obstacles[i]==0)divs[i].style.backgroundColor="whitesmoke";
            var fd=-1;
            for(var it=0;it<100000;it++)
            {
                if(fd==1)break;
                for(var jt=0;jt<x[it].length;jt++)
                {
                    if(x[it][jt]==finish)fd=1;
                    if(x[it][jt]==start || x[it][jt]==finish)continue;
                    else divs[x[it][jt]].style.backgroundColor=uv;
                }
            }
            myloopforPath(k,path);
        }
    },speed)
    // shouldIstart=1;

}
function getCoordinates(x)
{
    var a,b;
    a=Math.floor(x/col);
    b=x%col;
    var arr=[a,b];
    return arr;

}
function checkValidity(x,y)
{
    var num=(col*x)+y;
    if(x<0 || y<0 || x>=row || y>=col || obstacles[num]==1)return 0;
    else return 1;
}
function bfs()
{
     
    found=-1;
    clr=-1;
    setTimeout(function()
    {
        for(var i=0;i<parent.length;i++)parent[i]=-1;
        // for(var i=0;i<obstacles.length;i++)obstacles[i]=0;
        for(var i=0;i<time.length;i++)time[i]=9999;
        for(var i=0;i<row*col;i++)if(obstacles[i]==0)divs[i].style.backgroundColor=uv;
        // getRandonStartFinish();
         // speed=40;
    // var divs=document.getElementsByClassName("unvisited");
    // document.getElementById('btn-visualize').innerHTML="Running BFS";
    var arr=new Array(100000);
    for(var i=0;i<100000;i++)arr[i]=[];
    var q=[];
    // divs[start].innerHTML="start";
    divs[start].style.backgroundColor=st;
    divs[finish].style.backgroundColor=fn;
    var x=[-1,0,1,0];
    var y=[0,1,0,-1];
    time[start]=0;
    q.push(start);
    var vis=new Array(row*col).fill(0);
    vis[start]=1;
    var ct=0;
    var found1=-1;
    while(1)
    {
        if(q.length==0)break;
        
        var top=q[0];
        q.shift();
        var t=time[top];
        if(top==finish)found1=1;
        var a=getCoordinates(top)[0];
        var b=getCoordinates(top)[1];
        for(var i=0;i<4;i++)
        {
            var x1=a+x[i],y1=b+y[i];
            var num=(col*x1)+y1;
            if(checkValidity(x1,y1)==1 && vis[num]==0)
            {
                q.push(num);
                time[num]=t+1;
                vis[num]=1;
                parent[num]=top;
                // ct++;
            }
        }
    }
    var path=[];
    var pa=parent[finish];
    if(found1==1)
    {
        path.push(finish);
        while(pa!=-1)
        {
            path.push(pa);
            pa=parent[pa];
        }
    }
    
    for(var i=0;i<row*col;i++)
    {
        ct++;
        arr[time[i]].push(i);
        // console.log(time[i]);
        // console.log("  ");
    }
    // alert("done");
    clr=1;
    myloopforSearching(0,arr,divs,(path.length)-1,path);
    // if(found1==1)
    // {
    //     // setTimeout(console.log("afetr some"),10000);
    //     myloopforPath((path.length)-1,path);
    // }
    // alert(ct);
    },speed+50)
    
}
function dfsrec(node,vis,timer)
{
    vis[node]=1;
    time[node]=timer++;
    var y=[0,1,0,-1];
    var x=[-1,0,1,0];
    var a=getCoordinates(node)[0];
    var b=getCoordinates(node)[1];
    for(var i=0;i<4;i++)
        {
            var x1=a+x[i],y1=b+y[i];
            var num=(col*x1)+y1;
            if(checkValidity(x1,y1)==1 && vis[num]==0)
            {
                parent[num]=node;
                dfsrec(num,vis,timer);
                // ct++;
            }
        }
}
function dfs()
{
    found=-1;
    clr=-1;
    setTimeout(function()
    {
        for(var i=0;i<parent.length;i++)parent[i]=-1;
        // for(var i=0;i<obstacles.length;i++)obstacles[i]=0;
        for(var i=0;i<time.length;i++)time[i]=9999;
        for(var i=0;i<row*col;i++)if(obstacles[i]==0)divs[i].style.backgroundColor=uv;
        // getRandonStartFinish();
         // speed=10;
    // document.getElementById('btn-visualize').innerHTML="Running DFS";
    var arr=new Array(10000);
    for(var i=0;i<10000;i++)arr[i]=[];
    var vis=new Array(row*col).fill(0);
    vis[start]=1;
    var st=[];
    st.push(start)
    var x=[0,1,0,-1];
    var y=[-1,0,1,0];
    divs[start].style.backgroundColor=st;
    divs[finish].style.backgroundColor=fn;
    time[start]=0;
    var found1=1;
    var timer=0;
    dfsrec(start,vis,timer);
    //iterative have some bugs
    // while(st.length!=0)
    // {
    //     var top=st[(st.length)-1];
    //     st.pop();
    //     // console.log(top);
    //     if(top==finish)found1=1;
    //     time[top]=timer;
    //     timer++;
    //     var a=getCoordinates(top)[0];
    //     var b=getCoordinates(top)[1];
    //     for(var i=0;i<4;i++)
    //     {
    //         var x1=a+x[i],y1=b+y[i];
    //         var num=(col*x1)+y1;
    //         if(checkValidity(x1,y1)==1 && vis[num]==0)
    //         {
    //             st.push(num);
    //             vis[num]=1;
    //             parent[num]=top;
    //             // ct++;
    //         }
    //     }
    // }
    var path=[];
    var pa=parent[finish];
    if(found1==1)
    {
        path.push(finish);
        while(pa!=-1)
        {
            path.push(pa);
            pa=parent[pa];
        }
    }
    
    for(var i=0;i<row*col;i++)
    {
        arr[time[i]].push(i);
        // console.log(time[i]);
        // console.log("  ");
    }
    // alert("done");
    clr=1;
    myloopforSearching(0,arr,divs,(path.length)-1,path);
    // if(found1==-1)myloopforSearching(0,arr,divs,(path.length)-1,path);
    // else{
    //     document.getElementById('btn-visualize').innerHTML="Tracing Path";
    //     myloopforPath(path.length-1,path);
    // }
    },100)
    
}
function findMinDijkstra(vis,cost)
{
    var min=1000000;
    var index;
    for(var i=0;i<cost.length;i++)
    {
        if(vis[i]==0)
        {
            if(cost[i]<min)
            {
                min=cost[i];
                index=i;
            }
        }
    }
    return index;
}
function dijkstra()
{
    found=-1;
    clr=-1;
    setTimeout(function()
    {
        for(var i=0;i<parent.length;i++)parent[i]=-1;
        // for(var i=0;i<obstacles.length;i++)obstacles[i]=0;
        for(var i=0;i<time.length;i++)time[i]=9999;
        for(var i=0;i<row*col;i++)if(obstacles[i]==0)divs[i].style.backgroundColor=uv;
        // getRandonStartFinish();
        divs[start].style.backgroundColor=st;
    divs[finish].style.backgroundColor=fn;
    var vis=new Array(row*col).fill(0);
    var ct=0;
    var t=0;
    var cost=new Array(row*col).fill(1000000);
    cost[start]=0;
    parent[start]=-1;
    time[start]=0;
    var x=[-1,0,1,0];
    var y=[0,1,0,-1];
    var found1=-1;
    var arr=new Array(100000);
    for(var i=0;i<100000;i++)arr[i]=[];
    while(ct<row*col)
    {

        var node=findMinDijkstra(vis,cost);
        if(node==finish)found1=1;
        time[node]=t;
        
        var a=getCoordinates(node)[0];
        var b=getCoordinates(node)[1];
        for(var i=0;i<4;i++)
        {
            var x1=a+x[i];
            var y1=b+y[i];
            if(checkValidity(x1,y1)==1)
            {
                var temp=cost[node];
                var num=(col*x1)+y1;
                if(weight[num]==1)temp+=5;
                else temp++;
                if(cost[num]>=temp && vis[num]==0)
                {
                cost[num]=temp;
                parent[num]=node;
                time[num]=t+1;
                }
            }
        }
        vis[node]=1;
        ct++;
        t++;
    }
    var path=[];
    var pa=parent[finish];
    if(found1==1)
    {
        path.push(finish);
        while(pa!=-1)
        {
            path.push(pa);
            pa=parent[pa];
        }
    }
    
    for(var i=0;i<row*col;i++)
    {
        // ct++;
        arr[time[i]].push(i);
        // console.log(time[i]);
        // console.log("  ");
    }
    // alert("done");
    clr=1;
    myloopforSearching(0,arr,divs,(path.length)-1,path);
    },100)

}
function clearEveryThing()
{
    found=-1;
    clr=-1;
    setTimeout(function()
    {
        for(var i=0;i<parent.length;i++)parent[i]=-1;
        for(var i=0;i<obstacles.length;i++)obstacles[i]=0;
        for(var i=0;i<time.length;i++)time[i]=9999;
        for(var i=0;i<row*col;i++)
        {
            divs[i].style.backgroundColor=uv;
            var el=document.getElementById("wt"+i);
            el.style.display="none";
            weight[i]=0;
    
        }
        // getRandonStartFinish();
    },100)
}
function generateRandomObstacles()
{  
    // console.log("x")
    // getRandonStartFinish();
    clr=-1;
    found=-1;
    // clearEveryThing();
    setTimeout(function()
    {
        // clearEveryThing();
        for(var i=0;i<parent.length;i++)parent[i]=-1;
    for(var i=0;i<obstacles.length;i++)obstacles[i]=0;
    for(var i=0;i<time.length;i++)time[i]=9999;
    for(var i=0;i<row*col;i++)
    {
        divs[i].style.backgroundColor=uv;
        var el=document.getElementById("wt"+i);
        el.style.display="none";
        weight[i]=0;

    }
    var vis=new Array(row*col).fill(0);
    vis[start]=1;
    vis[finish]=1;
    var ct=0;
    for(var i=0;i<limit;i++)
    {
        var x=rand(row*col);
        if(vis[x]==0 && (x>=0 && x<(row*col)))
        {
            vis[x]=1;
            obstacles[x]=1;
            divs[x].style.backgroundColor=obs;
            time[x]=9999;
            ct++;
        }
        else{
            i--;
        }
    }
    // alert(ct);
    },200);

}
function generateRandomWeights()
{
    clr=-1;
    found=-1;
    // clearEveryThing();
    setTimeout(function()
    {
        // clearEveryThing();
        for(var i=0;i<parent.length;i++)parent[i]=-1;
    for(var i=0;i<obstacles.length;i++)obstacles[i]=0;
    for(var i=0;i<time.length;i++)time[i]=9999;
    for(var i=0;i<row*col;i++)
    {
        divs[i].style.backgroundColor=uv;
        var el=document.getElementById("wt"+i);
        el.style.display="none";
        weight[i]=0;

    }
    var vis=new Array(row*col).fill(0);
    vis[start]=1;
    vis[finish]=1;
    var ct=0;
    for(var i=0;i<limit;i++)
    {
        var x=rand(row*col);
        if(vis[x]==0 && (x>=0 && x<(row*col)))
        {
            vis[x]=1;
            weight[x]=1;
            var el=document.getElementById("wt"+x);
            el.style.display="inline";
            ct++;
        }
        else{
            i--;
        }
    }
    // alert(ct);
    },200);
}

function mazeGeneration()
{
    initialize();
    recMazeGeneration(1,1);
}
function ranMazeGeneration()
{
    setTimeout(function()
    {
        clr=-1;
    found=-1;
    // clearEveryThing();
    for(var i=0;i<parent.length;i++)parent[i]=-1;
    for(var i=0;i<obstacles.length;i++)obstacles[i]=0;
    for(var i=0;i<time.length;i++)time[i]=9999;
    for(var i=0;i<row*col;i++)
    {
        divs[i].style.backgroundColor=uv;
        var el=document.getElementById("wt"+i);
        el.style.display="none";
        weight[i]=0;

    }
    mazeGeneration();
    for(var i=0;i<row;i++)
    {
        for(var j=0;j<col;j++)
        {
            if(myMaze[i][j]=='#')
            {
                obstacles[col*i+j]=1;
                time[col*i+j]=9999;
                divs[col*i+j].style.backgroundColor=obs;
            }
        }
    }
    },200)
}
function startFunction()
{
    if(isRunning==1)return;
    changeSpeed();
    // start=rand(row*col);
    // while(obstacles[start]==1 || weight[start]==1)
    // {
    //     start=rand(row*col);
    // }
    // finish=rand(row*col);
    // while(1)
    // {
    //     if(finish!=start && obstacles[finish]==0)break;
    //     finish=rand(row*col);
    // }
    //check for speed
    // // getRandonStartFinish();
    // checkforStartAndFinish();
    if(document.getElementById('slow-option').checked==true)speed=70;
    else if(document.getElementById('medium-option').checked==true)speed=45;
    else if(document.getElementById('fast-option').checked==true)speed=25;
    else if(document.getElementById('superfast-option').checked==true)speed=1;
    //check for radio button
    if(document.getElementById('bfs-option').checked==true)
    {
        bfs();
        isRunning=1;
    }
    else if(document.getElementById('dfs-option').checked==true)
    {
        dfs();
        isRunning=1;
    }
    else if(document.getElementById('dijkstra-option').checked==true)
    {
        dijkstra();
        isRunning=1;
    }
    // dfs();
    // bfs();
    // mazeGeneration();
    // console.log(myMaze)
}
function changeSpeed()
{
    setInterval(function()
    {
        if(document.getElementById('slow-option').checked==true)speed=70;
        else if(document.getElementById('medium-option').checked==true)speed=45;
        else if(document.getElementById('fast-option').checked==true)speed=13;
        else if(document.getElementById('superfast-option').checked==true)speed=1;
    },3);
}
function checkforStartAndFinish()
{
    setInterval(function()
    {
        // console.log("1");
        // console.log(isRunning);
        if(obstacles[start]==1 || obstacles[finish]==1 || weight[start]==1 || finish==start)getRandonStartFinish();
        divs[start].style.backgroundColor=st;
        divs[finish].style.backgroundColor=fn;
    },8)
}

//main part
document.getElementById('bfs-option').checked=true;
document.getElementById('medium-option').checked=true;
getRandonStartFinish();
checkforStartAndFinish();

// var newspan=document.createElement("span");
// newspan.style.fontSize="9px";
// newspan.style.verticalAlign="middle";
// newspan.className="material-icons";
// newspan.innerHTML="fiber_manual_record";
// newspan.style.display="none";

for(var i=0;i<divs.length;i++)
{
    divs[i].id=i
    // divs[i].appendChild(elemnt);
    divs[i].style.backgroundColor=uv
    divs[i].style.transition="0.5s ease-out"
    divs[i].addEventListener("click",addObstacles);
    var newspan=document.createElement("span");
    newspan.style.fontSize="9px";
    newspan.style.verticalAlign="middle";
    newspan.style.color="#7D0633"
    newspan.className="material-icons";
    // newspan.innerHTML="fiber_manual_record";
    newspan.innerHTML="fitness_center";
    // newspan.style.transition="0.5s ease-out"
    newspan.style.display="none";
    newspan.id="wt"+i;
    divs[i].appendChild(newspan);
}

// getRandonStartFinish();

