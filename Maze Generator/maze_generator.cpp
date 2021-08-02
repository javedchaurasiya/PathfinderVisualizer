#include<bits/stdc++.h>
#define r 41
#define c 81
char v[r][c];

using namespace std;
void init()
{
    for(int i=0;i<r;i++)
    {
        for(int j=0;j<c;j++)
        {
            v[i][j]='#';
        }
        // cout<<endl;
    }
    // cout<<endl;
}
void print()
{
    for(int i=0;i<r;i++)
    {
        for(int j=0;j<c;j++)
        {
            cout<<v[i][j];
        }
        cout<<endl;
    }
    cout<<endl;
}



bool check(int x,int y)
{
    if(x<0 || y<0 || x>=r || y>=c)return false;
    else return true;
}

void dfs(int x,int y)
{
    v[x][y]=' ';
    vector<pair<int,int>> d={{1,0},{-1,0},{0,1},{0,-1}};
    for(int i=0;i<4;i++)
    {
        int ran=rand() & 3;
        swap(d[i],d[ran]);
    }
    for(int i=0;i<4;i++)
    {
        int x1=x+2*d[i].first;
        int y1=y+2*d[i].second;
        if(check(x1,y1) && v[x1][y1]=='#')
        {
            v[x1-d[i].first][y1-d[i].second]=' ';
            dfs(x1,y1);
        }
    }
    return;
}

int main()
{
    srand(time(0));
    init();
    // print();
    dfs(1,1);
    print();
    cout<<"x"<<endl;
    
}