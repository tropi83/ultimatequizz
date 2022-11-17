/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];

export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'admin_ultimate_quizz',
        title: 'ADMINISTRATION ULTIMATE QUIZZ',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:document',
        children: [
            {
                id: 'ultimate_quizz',
                title: 'Accueil',
                type: 'basic',
                icon: 'heroicons_solid:home',
                link: '/quizzs',
            },
            {
                id: 'theme',
                title: 'Themes',
                type: 'basic',
                icon: 'heroicons_solid:tag',
                link: '/admin/themes/list',
            },
            {
                id: 'users',
                title: 'Utilisateurs',
                type: 'basic',
                icon: 'heroicons_solid:user',
                link: '/admin/users/list',
            },
        ]
    }
];

