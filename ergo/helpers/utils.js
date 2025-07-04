const m = require('makerjs')
const fs = require('fs-extra')

const deepcopy = exports.deepcopy = (value) => JSON.parse(JSON.stringify(value))

exports.dump_model = (model, file='model', json=false) => {
    const assembly = m.model.originate({
        models: deepcopy(model),
        units: 'mm'
    })

    if (json) fs.writeFileSync(`${file}.json`, JSON.stringify(assembly, null, '    '))
    fs.writeFileSync(`${file}.dxf`, m.exporter.toDXF(assembly))
}

const line = exports.line = (a, b) => {
    return new m.paths.Line(a, b)
}

exports.circle = (p, r) => {
    return new m.paths.Circle(p, r)
}

exports.rect = (w, h, o=[0, 0], mirrored=false) => {
    const res = {
        top:    line([0, h], [w, h]),
        right:  line([w, h], [w, 0]),
        bottom: line([w, 0], [0, 0]),
        left:   line([0, 0], [0, h])
    }
    if (mirrored) {
        for (const [key, val] of Object.entries(res)) {
            const tmp = val.origin
            val.origin = val.end
            val.end = tmp
        }
    }
    return m.model.move({paths: res}, o)
}

const eq = exports.eq = (a=[], b=[]) => {
    return a[0] === b[0] && a[1] === b[1]
}

exports.poly = (arr) => {
    let counter = 0
    let prev = arr[arr.length - 1]
    const res = {
        paths: {}
    }
    for (const p of arr) {
        if (eq(prev, p)) continue
        res.paths['p' + (++counter)] = line(prev, p)
        prev = p
    }
    return res
}

