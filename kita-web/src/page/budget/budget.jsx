import Card from "../../components/cards/card.jsx"
import Card2 from "../../components/cards/card2.jsx"

function Budget() {
  return(
    
    <div>
      <Card title="Total Balance">
        <p className="amount">₱267,239.00</p>
        <p className="caption">All time net</p>
      </Card>

      <Card2 title="transaction">
        <p className="amount">₱267,239.00</p>
        <p className="caption">All time net</p>
      </Card2>    
    </div>
    
  )
}
export default Budget