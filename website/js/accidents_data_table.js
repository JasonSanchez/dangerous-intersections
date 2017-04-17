var el = "table-container";
window.onload = function () {
    var data_path = "./data/accident_scores_data_16.csv"

    $("#" + el).html("<table class='table table-striped table-condensed' id='" + el + "-table'></table>");

    $.when($.get(data_path)).then(
    function(data){      
      var csv_data = $.csv.toArrays(data);
      
      // Populate column headers.
      var table_head = "<thead><tr>";
      for (head_id = 0; head_id < csv_data[0].length; head_id++) { 
        table_head += "<th>" + csv_data[0][head_id] + "</th>";
      }
      table_head += "</tr></thead>";
      $('#' + el + '-table').append(table_head);

      // Populate data rows.
      $('#' + el + '-table').append("<tbody></tbody>");
      populateTable(csv_data);
      generateTable();
    });
}

function populateTable(csv_data, i) {
    console.log("populateTable called!");
    if (i == undefined) {
        i = 1;
    }
    if (i < csv_data.length) {
        var batchSize = 100;
        for (j = i; j < i + batchSize && j < csv_data.length; ++j) {
          populateRowData(j, csv_data);
        }

        var nextBitOfWork = function() {
            populateTable(csv_data, i + batchSize);
        };
        nextBitOfWork();
    }
}

function populateRowData(row_id, csv_data) {
    var row_html = "<tr>";
    for (col_id = 0; col_id < csv_data[row_id].length; col_id++) { 
      row_html += "<td>" + csv_data[row_id][col_id] + "</td>";
    }
    row_html += "</tr>";
    $('#' + el + '-table tbody').append(row_html);
}

function generateTable() {
    $('#' + el + '-table').dataTable({
        "paging": true,
        "columns": [
          {"type": "num"},
          {"type": "string"},
          {"type": "num"},
          {"type": "num"},
          {"type": "num"},
          {"type": "num"},
          {"type": "num"}
        ],
        // Disable initial sort since it's already sorted.
        "aaSorting": [],
      });
}


