import { Component } from '@angular/core';
import { Muscle } from '../../../../../core/models/interfaces/muscle.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-targeted-muscles-filter',
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: './targeted-muscles-filter.component.html',
})
export class TargetedMusclesFilterComponent {
    //font awesome icons
    faMagnifyingGlass = faMagnifyingGlass;

    searchBarFocused = false;
    targetedMuscles: Muscle[] = [
        
    ];
}
