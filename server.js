import { ApolloServer,gql } from "apollo-server";

const tweets=[
    {
        id:"1",
        text:"firstOne",
    },
    {
        id:"2",
        text:"secondOne",
    }
]

const typeDefs=gql`
    type User{
        id:ID!
        username:String!
    }
    type Tweet{
        id:ID
        text:String
        author:User
    }
    type Query{
        allTweets:[Tweet]
        tweet(id:ID!):Tweet
        ping:String!
    }
    type Mutation{
        postTweet(text:String,userId:ID):Tweet
        deleteTweet(id:ID):Boolean
    }
`

const resolvers={
    Query:{
        tweet(){
            console.log("I'm called")
            return null;
        },
        ping(){
            return"pong"
        },
        allTweets(){
            return tweets
        },
        tweet(root,{id}){
            return tweets.find((tweet)=>tweet.id===id);
        }
    },
    Mutation:{
        postTweet(root,{text,userId}){
            const newTweet={
                id:tweets.length+1,
                text:text
            }
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(root,{id}){
            const check=tweets.find((tweet)=>tweet.id===id);
            if(!check) return false;
            tweets=tweets.filter((tweet)=>tweet.id!==id)
            return true;
        }
    }
}

const server=new ApolloServer({typeDefs,resolvers});

server.listen().then(({url})=>{
    console.log(`running app ${url}`)
});
