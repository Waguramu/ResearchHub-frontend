/**
 * created by MarlaN. 13.06.2017
 */
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Research } from '../../research';
import {Chair} from '../../data-model/chair';
import {Faculty} from '../../data-model/faculty';
import {ProjectType} from '../../data-model/projectType';
import { ProjectsService } from '../../services/projects.service';
import { ChairsService } from '../../services/chairs.service';
import { FacultiesService } from '../../services/faculties.service';
import { Location }               from '@angular/common';

import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'create-project',
  templateUrl: './view-project-create.component.html',
  styleUrls: [ './view-project-create.component.css' ]
})
export class CreateProjectComponent implements OnInit {
  researches: Research[] = [];
  chairs: Chair[] = [];
  faculties: Faculty[] = [];
  projectTypes: ProjectType[] = [{'_id': 0, 'projectType' : 'Master thesis' },{'_id': 1, 'projectType' : 'Bachelor thesis' },{'_id': 2, 'projectType' : 'IDP' }];
  selectedChair: String = 'Please select';
  selectedFaculty: String = 'Please select';
  selectedProjectType: String = 'Please select';
  project = {};

  constructor(
    private researchService: ProjectsService,
    private chairsService: ChairsService,
    private facultiesService: FacultiesService,
    private location: Location,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.researchService.getProjects().then(researches => this.researches = researches);
    this.chairsService.getChairs().then(chairs => this.chairs = chairs);
    this.facultiesService.getFaculties().then(faculties => this.faculties = faculties);
  }

  cancel(): void {
    this.location.back();
  }

  save(): void {
    // TODO show alert that title should be filled
    //this.project.title = this.project.title.trim();
   // if (!title) { return; }
    /*this.researchService.create(title)
      .then(research => {
       // this.researches.push(research);
        this.cancel();
      });*/
    this.researchService.create(this.project);
    this.router.navigate(['/createsuccess']);

  }

  dropdownselectedProjectType(projectType: ProjectType): void {
    this.selectedProjectType = projectType.projectType;
  }

  dropdownselectedChair(chair: Chair): void {
    this.selectedChair = chair.name;
  }

  dropdownselectedFaculty(faculty: Faculty): void {
    this.selectedFaculty = faculty.name;
  }

}
