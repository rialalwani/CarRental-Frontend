import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";

export const AllTransactions = () => {
    const transactions = useSelector(state=>state.Transactions.transactions);
    const Users=useSelector(state=>state.UserReducers.Users)
    console.log(transactions)

    const findUser = (userEmail) => {
        return Users.find(u => u.email === userEmail);
    }

    return (
        <div style={{ backgroundColor: "rgba(0,0,0,0.865)", color: "white",minHeight:"100vh", height:"fit-content" }}>
            <h4 style={{ textAlign: "center",paddingTop:"3rem" }}>All Transactions</h4>
            <div style={{width:"fit-content",marginTop:"2rem",padding:"1rem",display:"flex",flexDirection:"column-reverse",justifySelf:"center",paddingBottom:"4rem"}}>
                {transactions.map((transaction, index) => {
                    const user = findUser(transaction?.user);
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                padding: "10px",
                                borderRadius: "5px",
                                width:"25rem",
                                border:"1px solid white"
                            }}
                            key={index}
                        >
                            {user ? (
                                <div>
                                    <div>Name: {user?.name}</div>
                                    <div>Phone Number: {user?.phoneNumber}</div>
                                </div>
                            ) : (
                                <div>User not found</div>
                            )}
                            <div>Amount: <FaPlus fill="green" fontSize={10}/> ₹{transaction?.amount/100}</div>
                             <p style={{textAlign:"right",marginTop:"0.5rem"}}>{new Date(transaction?.createdAt).toLocaleString()}</p>
                        </div>
                    );
                })}
            </div>
            {transactions?.length === 0 && <p style={{ textAlign: "center", marginTop: "4rem" }}>No Transactions</p>}
        </div>
    );
}