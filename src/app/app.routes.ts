import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TariffsCompareComponent } from './components/tariffs-compare/tariffs-compare.component';
import { TariffsListComponent } from './components/tariffs-list/tariffs-list.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', component: TariffsListComponent },
    { path: 'compare', component: TariffsCompareComponent },
    { path: '**', component: PageNotFoundComponent }
];
