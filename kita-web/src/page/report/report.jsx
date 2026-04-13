import "./report.css";

function Report() {
  return (
    <div className="report">

      <div className="report-heading">

        <div className="left-heading">
          <h1>Report</h1>
          <p>Good Day!</p>
        </div>
      </div>  

        <div className="report-body">

          <div className="income-expenses">
            <div className="incomeExpenses-heading">
              <h2>Income vs Expenses</h2><hr />
            </div>
            <div className="incomeExpenses">
              <p>This is where the report content will be displayed.</p>
            </div>
          </div>

          <div className="category-breakdown">
              <div className="categoryBreakdown-headings">
                <h2>Income vs Expenses</h2><hr />
              </div>
              <div className="categoryBreakdown">
                <p>This is where the report content will be displayed.</p>
              </div>
          </div>

        </div>
  
    </div>
  );
}

export default Report;