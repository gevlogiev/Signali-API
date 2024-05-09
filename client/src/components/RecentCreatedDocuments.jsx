export default function RecentSales(lastFiveSignals) {

  const LastFive = Object.values(lastFiveSignals);

  return (
    <div className="col-12">
      <div className="overflow-auto card recent-sales">


        <div className="card-body">
          <h5 className="card-title">Последно обработени сигнали</h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Подател</th>
                <th scope="col">Подаден чрез</th>
                <th scope="col">Тема </th>
                <th scope="col">Статус</th>
              </tr>
            </thead>
            <tbody>

              {Object.values(LastFive).map((lastFive) => (
                lastFive.map((signal, index) => {
            
                  return (
                    <tr key={index}>
                      <th scope="row"><a href="#">{signal.random_number || 'N/A'}</a></th>
                      <td>{signal.name || 'N/A'}</td>
                      <td><a href="#" className="text-primary">{signal.source || 'N/A'}</a></td>
                      <td><a href="#" className="text-primary">{signal.topic || 'N/A'}</a></td>
                      <td><span className={`badge bg-${signal.status === 'Предаден' ? 'success' : 'danger'}`}>{signal.status || 'N/A'}</span></td>
                    </tr>

                  )
                }


                )
              )
              )
              }





            </tbody>
          </table>

        </div>

      </div>
    </div>
  )
}