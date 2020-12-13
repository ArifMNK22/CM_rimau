// add your helper function here
export const csvJSON = (csv) => {
    const lines = csv.split('\n')
    const rows = []
    const headers = lines[0].split(',')
    
    for (let i = 1; i < lines.length; i++) {        
        if (!lines[i])
            continue
        const obj = {}
        const currentline = lines[i].split(',')

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }
        rows.push(obj)
    }
    return {headers,rows}
  }