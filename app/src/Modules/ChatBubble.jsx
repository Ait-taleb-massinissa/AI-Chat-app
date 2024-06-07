
function ChatBubble({who,what}){
    return(
        <div  style={who=="user"?{display:"flex",justifyContent:"flex-end"}:{}} >
            
            <div className="bubble" style={who=="assistant"?{width:"fit-content",padding:"10px",position:"relative" ,margin:"10px",backgroundColor:"grey",borderRadius:"20px"}:{width:"fit-content",padding:"10px ",position:"relative",right:"" ,margin:"10px",backgroundColor:"#7d95ad",borderRadius:"20px"}} >

                <span style={{color:"black",fontWeight:"600"}} > {who=="user"? "You" :"AI"} </span>
                
                <div style={{marginTop:"10px"}} >
                    {what} 
                </div>
            
            </div>

        </div>
    )
}

export default ChatBubble;