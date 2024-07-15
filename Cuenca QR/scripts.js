let recycles = [
    { id: 1, type: 'Material Peligroso', steps: 'Separar adecuadamente, Llevar a un centro especializado', colorClass: 'dangerous', color: '#ff0000' },
    { id: 2, type: 'Cartón y Papel', steps: 'Separar papel limpio, Quitar grapas y clips, Llevar al centro de reciclaje', colorClass: 'paper-cardboard', color: '#ffcc33' },
    { id: 3, type: 'Vidrio y Plástico', steps: 'Lavar y secar, Separar por tipo, Llevar al centro de reciclaje', colorClass: 'glass-plastic', color: '#00bcd4' }
];

function populateDropdown() {
    const dropdown = document.getElementById('recycle-select');
    dropdown.innerHTML = ''; // Clear previous options
    recycles.forEach(recycle => {
        const option = document.createElement('option');
        option.value = recycle.id;
        option.textContent = recycle.type;
        option.classList.add(recycle.colorClass);
        dropdown.appendChild(option);
    });
}

function generateQR() {
    const selectedRecycleId = document.getElementById('recycle-select').value;
    const selectedRecycle = recycles.find(recycle => recycle.id === parseInt(selectedRecycleId));

    if (selectedRecycle) {
        const qrData = `Tipo de Reciclaje: ${selectedRecycle.type}\nPasos: ${selectedRecycle.steps.split(',').join('\n')}\n\nBeneficios de reciclar:\n- Conserva recursos naturales\n- Ahorra energía\n- Reduce la contaminación\n\nDaños de no reciclar:\n- Agotamiento de recursos\n- Aumento de residuos\n- Daño a la biodiversidad`;
        
        QRCode.toCanvas(document.getElementById('qr-code'), qrData, { 
            width: 200, 
            color: {
                dark: selectedRecycle.color,
                light: '#ffffff'
            }
        }, function (error) {
            if (error) console.error(error);
        });

        const downloadLink = document.getElementById('download-link');
        const canvas = document.getElementById('qr-code');
        const dataURL = canvas.toDataURL('image/png');
        downloadLink.href = dataURL;
        downloadLink.style.display = 'inline';

        const recycleBox = document.getElementById('recycle-box');
        recycleBox.textContent = `Tipo de Reciclaje: ${selectedRecycle.type}\nPasos:\n${selectedRecycle.steps.split(',').join('\n')}\n\nBeneficios de reciclar:\n- Conserva recursos naturales\n- Ahorra energía\n- Reduce la contaminación\n\nDaños de no reciclar:\n- Agotamiento de recursos\n- Aumento de residuos\n- Daño a la biodiversidad`;
        recycleBox.className = selectedRecycle.colorClass;
        recycleBox.style.display = 'block';
    }
}

function showEditor() {
    const editor = document.getElementById('editor');
    editor.style.display = editor.style.display === 'none' ? 'block' : 'none';
}

function saveRecycle() {
    const type = document.getElementById('type').value;
    const steps = document.getElementById('steps').value;

    if (type && steps) {
        const newRecycle = {
            id: recycles.length + 1,
            type,
            steps,
            colorClass: 'custom',
            color: '#000000' // Asignar color predeterminado
        };
        recycles.push(newRecycle);
        populateDropdown();
        showEditor();
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

populateDropdown();
