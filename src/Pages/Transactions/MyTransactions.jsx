import { useSelector } from "react-redux"
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

export const MyTransactions = () => {

    const transactions = useSelector((state) => state.Transactions.transactions);
    console.log(transactions)

    return (
        <div style={{ backgroundColor: "rgba(0,0,0,0.865)", height: "fit-content",paddingBottom:"4rem",minHeight:"100vh" }}>
            <h4 style={{ textAlign: "center", paddingTop: "4rem", color: "white" }}>My Transactions</h4>
            <div style={{ width: "15rem", backgroundColor: "white", padding: "1rem", marginTop: "3rem",display:"flex",flexDirection:"column-reverse",justifySelf:"center" }}>
                {transactions?.map((transaction, index) => (
                    <div style={{borderBottom:"2px solid #ccc"}}>
                        <div key={index} style={{ display: "flex", justifyContent: "space-between"}}>
                            <div>
                                <p>AMR Wheels</p>
                                <p>₹{transaction?.amount / 100}</p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", marginTop: "0.3rem" }}>
                                {transaction?.status === "success" ? <TiTick fill="green"></TiTick> : <RxCross2 fill="red"></RxCross2>}
                                {transaction?.status === "success" ? <p style={{ color: "green", marginTop: "1rem" }}>Success</p> : <p style={{ color: "red", marginTop: "1rem" }}>Failed</p>}
                            </div>
                        </div>
                        <p style={{textAlign:"right",marginTop:"0.5rem"}}>{new Date(transaction?.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
            {transactions?.length === 0 && <p style={{ textAlign: "center", marginTop: "4rem" }}>No Transactions</p>}
        </div>
    )
}