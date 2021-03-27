import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('WorkoutTypesPage => WorkoutsPage, WorkoutsPage => ExercisesPage',  slideTo('left')),
    transition('ExercisesPage => WorkoutsPage, WorkoutsPage => WorkoutTypesPage',  slideTo('right'))
  ]);

  function slideTo(direction: string) {
    return [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          [direction]: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ [direction]: '100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ [direction]: '-100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ [direction]: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]
  }