const UtenteItems = ({ patientId }) => {
    const UtenteItemsData = [
        {
            title: "Calendário",
            link: `/work_area/patients/${patientId}/calendar`
        },
        {
            title: "Histórico",
            link: `/work_area/patients/${patientId}/history`
        },
        {
            title: "Medicação",
            link: `/work_area/patients/${patientId}/medication`
        },
        {
            title: "Dados Físicos",
            link: `/work_area/patients/${patientId}/physical_data`
        },
        {
            title: "Testes Realizados",
            link: `/work_area/patients/${patientId}/tests_performed`
        },
        {
            title: "Relatórios",
            link: `/work_area/patients/${patientId}/reports`
        },
        {
            title: "Prescrições",
            link: `/work_area/patients/${patientId}/prescriptions`
        },
        {
            title: "Análise",
            link: `/work_area/patients/${patientId}/analysis`
        }
    ];

    return (
        UtenteItemsData.map((val, key) => {
            return (
                <option key={key} value={val.link}>{val.title}</option>
            )
        })
    )
}
export default UtenteItems


