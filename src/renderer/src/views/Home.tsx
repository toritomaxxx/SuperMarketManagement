
import { Link } from "react-router-dom";
export default function Home(){
    return(
    <div>
        <h1
            style={
                {
                    color:"black",
                    fontSize:50,
                }
            }
        >
            Home
        </h1>
        <Link to="/">Login</Link>
    </div>
    )
}