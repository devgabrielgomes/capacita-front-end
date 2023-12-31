import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faChartColumn, faBook } from '@fortawesome/free-solid-svg-icons'

export const SideBarItems = [
    {
        title: "Perfil Pessoal",
        icon: <FontAwesomeIcon icon={faUser} />,
        link: '/work_area/personal_profile'
    },
    {
        title: "Utentes",
        icon: <FontAwesomeIcon icon={faUsers} />,
        link: '/work_area/patients'
    },
    {
        title: "Análise Estatística",
        icon: <FontAwesomeIcon icon={faChartColumn} />,
        link: '/work_area/statistics'
    },
    {
        title: "Livro Verde",
        icon: <FontAwesomeIcon icon={faBook} />,
        link: '/work_area/green_book'
    }
];

export const SideBarAdminItems = [
    {
        title: "Perfil Pessoal",
        icon: <FontAwesomeIcon icon={faUser} />,
        link: '/work_area/personal_profile'
    },
    {
        title: "Utentes",
        icon: <FontAwesomeIcon icon={faUsers} />,
        link: '/work_area/patients'
    },
    {
        title: "Técnicos de EF",
        icon: <FontAwesomeIcon icon={faUsers} />,
        link: '/work_area/technics_ef'
    },
    {
        title: "Instituições",
        icon: <FontAwesomeIcon icon={faUsers} />,
        link: '/work_area/institutions'
    },
    {
        title: "Análise Estatística",
        icon: <FontAwesomeIcon icon={faChartColumn} />,
        link: '/work_area/statistics'
    },
    {
        title: "Livro Verde",
        icon: <FontAwesomeIcon icon={faBook} />,
        link: '/work_area/green_book'
    }
];


