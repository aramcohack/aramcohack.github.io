import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "ngx-infrastructure-graph",
    templateUrl: "./infrastructure-graph.component.html",
    styleUrls: ["./infrastructure-graph.component.scss"]
})
export class InfrastructureGraphComponent implements OnInit {
    links = [
        {
            id: "link2",
            source: "192.168.100.1",
            target: "192.168.100.2"
        },
        {
            id: "link3",
            source: "192.168.100.1",
            target: "192.168.100.3"
        },
        {
            id: "link4",
            source: "192.168.100.1",
            target: "192.168.100.4"
        },
        {
            id: "link5",
            source: "192.168.100.1",
            target: "192.168.100.5"
        },
        {
            id: "link6",
            source: "192.168.100.1",
            target: "192.168.100.6"
        },
        {
            id: "link7",
            source: "192.168.100.1",
            target: "192.168.100.7"
        },
        {
            id: "link8",
            source: "192.168.100.1",
            target: "192.168.100.8"
        },
        {
            id: "link254",
            source: "192.168.100.1",
            target: "192.168.100.254"
        },
        {
            id: "linkdmz",
            source: "192.168.100.1",
            target: "5.227.94.15"
        },
        {
            id: "linkbr250",
            source: "192.168.100.254",
            target: "192.168.100.250"
        },
        {
            id: "linkbr251",
            source: "192.168.100.254",
            target: "192.168.100.251"
        },
        {
            id: "linkbr252",
            source: "192.168.100.254",
            target: "192.168.100.252"
        },
        {
            id: "linkbr253",
            source: "192.168.100.254",
            target: "192.168.100.253"
        }
    ];
    clusters = [
        {
            id: "headquarters",
            label: "headquarters",
            childNodeIds: ["section", "servers", "5.227.94.15", "192.168.100.1", "192.168.100.8"]
        },
        {
            id: "branch",
            label: "branch",
            childNodeIds: [
                "192.168.100.254",
                "192.168.100.250",
                "192.168.100.251",
                "192.168.100.252",
                "192.168.100.253"
            ]
        },
        {
            id: "section",
            label: "section",
            childNodeIds: ["192.168.100.2", "192.168.100.3", "192.168.100.4"]
        },
        {
            id: "servers",
            label: "servers",
            childNodeIds: ["192.168.100.5", "192.168.100.6", "192.168.100.7"]
        }
    ];

    @Input() isActive;
    @Input() nodes;
    @Output() stop = new EventEmitter();
    @Output() start = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
