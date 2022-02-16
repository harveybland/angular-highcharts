import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_data from 'highcharts/modules/data';
import exporting from 'highcharts/modules/exporting';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
HC_data(Highcharts); // need this for CSV data use
exporting(Highcharts); // need this for export menu

@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.css']
})
export class OutputGraphComponent implements OnInit {
  public options: any = {
    data: {
      // table: 'datatable'
      //csv: document.getElementById('csv').innerHTML,
      csv: '',
      itemDelimiter: ',',
      lineDelimiter: '\n',
    },
    chart: {
      type: 'column'
    },
    title: {
      text: 'Data extracted from a CSV in the page.'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      }
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: 'Count'
      }
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' +
          this.point.y + ' ' + this.point.name.toLowerCase();
      }
    }
  }


  constructor() { }

  ngOnInit(): void {
    // load string from API
    this.options.data.csv = `Name,Field ,Head Office,Marketing,People Ops,Retail,Test 
    1st Interview,,3,3,4,,5
    2nd interview,,1,,1,,
    3rd Interview,,1,,,,
    Appointed,,3,1,1,1,1
    Decline after 1st Interview,,4,,,,
    Declined,,6,1,,1,1
    New,,13,,7,,4
    NHS - Invite to Pre-Screening,,1,,,,
    NHS - Screening in Progress,,,,1,,
    NHS - Screening Incomplete - Decision referred,,,,1,,
    Offer Requested,,1,,,,
    RFMI,,2,8,,,
    RFMI Complete,1,,2,1,,
    Telephone Screening,,2,,1,,
    Withdrawn,,1,3,,,`;
    Highcharts.chart('chartContainer', this.options);

  }

}
