import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'ngx-ecommerce',
    templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent implements OnInit {
    constructor(private http: HttpClient) {}

    isActive = true;
    attacks: Observable<any[]>;
    attackDetails: Observable<any>;
    time: Observable<any>;
    first: string;
    nodes = [
        {
            id: '5.227.94.15',
            label: 'dmz',
            cozy: 'kek',
            det: { color: 'rgba(255, 255, 255, 0.5)' },
        },
        {
            id: '192.168.100.1',
            label: 'hq switch',
            det: { color: 'rgba(255, 255, 255, 0.5)' },
        },
        {
            id: '192.168.100.8',
            label: 'terminal',
            det: { color: 'rgba(255, 255, 255, 0.5)' },
        },
        {
            id: '192.168.100.2',
            label: 'workstation',
            det: { color: 'rgba(255, 255, 255, 0.5)' },
        },
        {
            id: '192.168.100.3',
            label: 'workstation',
            det: { color: 'rgba(255, 255, 255, 0.5)' },
        },
        {
            id: '192.168.100.4',
            label: 'workstation',
            det: { color: 'rgba(255, 255, 255, 0.5)' },
        },
        {
            id: '192.168.100.5',
            label: 'app server',
            det: { color: 'rgba(255, 255, 255, 0.5)' },
        },
        {
            id: '192.168.100.6',
            label: 'storage server',
            det: { color: 'rgba(255, 255, 255, 0.5)' },
        },
        {
            id: '192.168.100.7',
            label: 'db server',
            det: { color: 'rgba(255, 255, 255, 0.5)' },
        },
        {
            id: '192.168.100.254',
            label: 'brunch switch',
            det: { color: 'rgba(255, 255, 255, 0.5)' },
        },
        {
            id: '192.168.100.250',
            label: 'br server',
            det: { color: 'rgba(255, 255, 255, 0.5)' },
        },
        {
            id: '192.168.100.251',
            label: 'br workstation',
            det: { color: 'rgba(255, 255, 255, 0.5)' },
        },
        {
            id: '192.168.100.252',
            label: 'br workstation',
            det: { color: 'rgba(255, 255, 255, 0.5)' },
        },
        {
            id: '192.168.100.253',
            label: 'br workstation',
            det: { color: 'rgba(255, 255, 255, 0.5)' },
        },
    ];

    ngOnInit() {
    }
}
