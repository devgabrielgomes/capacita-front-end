import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faChartColumn, faBook } from '@fortawesome/free-solid-svg-icons'

export const SideBarItems = [
    {
        title: "Perfil Pessoal",
        icon: <FontAwesomeIcon icon={faUser} />,
        link: "/area_trabalho/pessoal"
    },
    {
        title: "Utentes",
        icon: <FontAwesomeIcon icon={faUsers} />,
        link: "/area_trabalho/utentes"
    },
    {
        title: "Análise Estatística",
        icon: <FontAwesomeIcon icon={faChartColumn} />,
        link: "/area_trabalho/analise"
    },
    {
        title: "Livro Verde",
        icon: <FontAwesomeIcon icon={faBook} />,
        link: "/area_trabalho/livro"
    },
];


// const SideBarItems = [
//     {
        
//         link: 1
//     },
//     {
        
//         link: 2
//     },
//     {
        
//         link: 3
//     },
//     {
        
//         link: 4
//     }
// ];
