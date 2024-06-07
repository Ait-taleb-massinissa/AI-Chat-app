
function ChatBubble(who){

    return(
        <div  style={who.who=="user"?{display:"flex",justifyContent:"flex-end"}:{}} >
            
            <div className="bubble" style={who.who=="AI"?{width:"fit-content",padding:"10px",position:"relative" ,margin:"10px",backgroundColor:"grey",borderRadius:"20px"}:{width:"fit-content",padding:"10px ",position:"relative",right:"" ,margin:"10px",backgroundColor:"#7d95ad",borderRadius:"20px"}} >

                <span style={{color:"black",fontWeight:"600"}} >ChatGPT</span>
                
                <div style={{marginTop:"10px"}} >
                    hello there 
                </div>
            
            </div>

        </div>
    )
}

export default ChatBubble;