const UtenteItems = ({ patientId }) => {
    const UtenteItemsData = [
        {
            title: "Prescrições",
            link: `/work_area/patients/${patientId}/prescriptions`
        },
        {
            title: "Dados Físicos",
            link: `/work_area/patients/${patientId}/physical_data`
        },
        {
            title: "Medicação",
            link: `/work_area/patients/${patientId}/medication`
        },
        {
            title: "Análise",
            link: `/work_area/patients/${patientId}/analysis`
        },
        {
            title: "Calendário",
            link: `/work_area/patients/${patientId}/calendar`
        },
        {
            title: "Histórico",
            link: `/work_area/patients/${patientId}/history`
        },

        {
            title: "Testes Realizados",
            link: `/work_area/patients/${patientId}/tests_performed`
        },
        {
            title: "Relatórios",
            link: `/work_area/patients/${patientId}/reports`
        }
    ];

    return (
        UtenteItemsData.map((val, key) => {
            return (
                window.location.pathname.includes(val.link.split('/')[4])
                    ? <option key={key} value={val.link} defaultValue>{val.title}</option>
                    : <option key={key} value={val.link}>{val.title}</option>
            )
        })
    )
}
export default UtenteItems


