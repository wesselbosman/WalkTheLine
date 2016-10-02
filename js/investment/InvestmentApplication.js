/**
 * Created by WesselBosman on 10/1/2016.
 */
function InvestmentApplication(LumpSumInvestmentMonth, LumpSumInvestmentAmount, DebitOrderStartMonth, DebitOrderAmount)
{
    // Validate the entered date so that it is within the correct range,
    // otherwise set the variable to undefined for later error handling
    //decrement the date input from user by 1 because the date instantiation month parameter is zero indexed

    var lumpSumInvestmentMonth = validateMonthRange(LumpSumInvestmentMonth) ? LumpSumInvestmentMonth : undefined;
    var debitOrderStartMonth = validateMonthRange(DebitOrderStartMonth) ? DebitOrderStartMonth : undefined;
    var monthsLeftInYearOfLump = monthsLeftInTaxYearToContribute(lumpSumInvestmentMonth);
    var monthsLeftInYearOfDebitOrder = monthsLeftInTaxYearToContribute(debitOrderStartMonth);

    //Object Properties
    this.totalContributions = getTotalContributions();
    this.earliestPermissibleDebitOrderStartMonth = getEarliestPermissibleDebitOrderStartMonth();


    // Method (class function) to validate that the date is within
    // the known range of date magic numbers (1 - 12)
    function validateMonthRange (dateInteger) {
    // Simplified Ternary operator to return the results of the predicate,
    // in this case it's checking if the range is within 1 and  12
       return !!(dateInteger > 0 && dateInteger < 13 )
    }

    function monthsLeftInTaxYearToContribute(date){
        return date > 2 ? (13 - date)+2 : 3 - date;
    }

    //Calculate the total contributions in the tax year
    function getTotalContributions() {

        if (monthsLeftInYearOfLump < 0 && monthsLeftInYearOfDebitOrder < 0){
            return parseInt(LumpSumInvestmentAmount)
        }


        else return (parseInt(LumpSumInvestmentAmount) + (parseInt(DebitOrderAmount) * monthsLeftInYearOfDebitOrder));

    }

    //Calculate the earliest permissible debit order start month
    function getEarliestPermissibleDebitOrderStartMonth() {
        var bestMonth = parseInt(lumpSumInvestmentMonth);
        var safety = 0;

        while ((parseInt(LumpSumInvestmentAmount) + (parseInt(DebitOrderAmount) * (monthsLeftInTaxYearToContribute(bestMonth))))> 30000 && safety <= 13){
            bestMonth = bestMonth+1;
            safety++
        }

        return bestMonth >= 12 ? 2 : bestMonth;
    }

    //Render the results on the HTML page
    document.getElementById('output').innerHTML =(
        "<ul>" +
        "<li> Total Contributions:" +this.totalContributions+ "</li>"+
        "<li> Earliest Permissible Debit Order Month:"+this.earliestPermissibleDebitOrderStartMonth+ "</li>"+
        "</ul>"

    );

}







