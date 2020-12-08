//const jsonData = require("./data.json");
const jsonData = {
    fullTitle: 'CLX SET with AMD Ryzen 9 3900X 3.8GHz, GeForce RTX 2080Ti 11GB, 32GB Mem, 1TBNVME M .2 + 6 TB HDD, WiFi, Win 10 ',
    price: '$3259.99',
    pcImage: "images/pc.png",
    specificationsOverview: [
        'Ryzen 9 3rd Gen 3900X 12-Core 3.80 GHz (Max Turbo 4.6GHz)',
        '32 GB DDR4 RGB Memory (128GB Max)',
        'NVIDIA GeForce RTX 2080 Ti 11GB GDDR6',
        '1TB M.2 NVMe SSD + 6TB HDD',
        'AMD X570 Chipset ATX Motherboard | 2 x PCI Express 4.0 x16',
        'Black Mid-Tower w/Tempered Glass and RGB Lighting',
        '240mm Liquid-Cooled | 4 RGB Fans | 850W Gold PS',
        '802.11ac / BT 4.2 WiFi',
        'Windows 10 Home',
        'Virtual Reality Ready'
    ],
    overview: 'A Leap ahead of other gaming systems, this VR-Ready CLX SET gaming desktop has the power and performance you demand! It sports a 3rd Gen 12-Core AMD Ryzen 9 3900X 3.8GH z processor (Max. Boost Speed of 4.6GH z) and 32GB of DDR4 memory. The 11GB NVIDIA GeForce RTX 2080Ti video card delivers eye-stunning graphics and supports even Next-Gen VR devices. Meanwhile, the 1TB NVME M. 2 solid-state drive plus a 6TB HDD provide a perfect blend of speed and storage. And it isn\'t just the insides that look great; the CLX SET is housed in a sleek gaming chassis, designed for maximum expandability and airflow.<br><br> With both wired and WiFi networking capabilities, you can game how you want, where you want. We even pre-install Microsoft  Windows 10 Home, and include a FREE Wired Gaming Keyboard and Mouse, so you can be up and playing like a pro  on your favorite games in no time! Invest in a system above the rest - order your CLX SET today!',
    specificationsDetail: {
        processor: 'AMD Ryzen 9 3900X 3.8GH z (12 Cores)',
        chipset: 'AMD X570 Chipset',
        memory: '2GB DDR4 - 2 x 16GB DDR4 (128GB Max)',
        hard_drives: '1TB NVME M. 2 SSD + 6TB HDD',
        video_graphics: 'NVIDIA GeForce RTX 2080Ti 11GB',
        power_supply: '850 Watt Gold Power Supply',
        network_connectivity: '10/100/1000 Gigabit Ethernet Network Port, WiFi',
        chassis_fan: '120mm Fans with RGB lights',
        expansion_slots: '(1) 4.0 PCIe x1, 2 (1) 4.0 PCIe x16',
        ports: '(2) USB 2.0 | (2) USB 3.0 | (6) USB 3.2 Gen1 | (2) USB 3.2 Gen2 Type-A<',
        video_connectivity: '(3) Display Port, (1) HDMI, (1) USB-C'
    }
};


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getPC(pcId) {
    return fetch("http://localhost:3000/getProduct?id=" + pcId, {});
}



const pcId = getParameterByName("id");
if (pcId !== null && pcId !== "") {
    getPC(pcId)
        .then(response => response.json())
        .then(data => {
            const pcInfo = data;
            console.log(data);
            setElement("fullTitle", pcInfo.title);
            setElement("price", pcInfo.price);
            setElement("overview", pcInfo.description_long);
            //set image
            document.getElementById("pcImage").setAttribute("src", pcInfo.photo)
            //add specification overview
            const specificationsOverview = document.getElementById("specificationsOverview")
            for (overviewText of pcInfo.specifications_overview) {
                const overviewEl = document.createElement("li");
                overviewEl.innerHTML = overviewText;
                specificationsOverview.appendChild(overviewEl);
            }

            const spec = pcInfo.specifications_details;
            setElement("processor", spec.processor.title);
            setElement("chipset", spec.chipset.title);
            setElement("memory", spec.memory.title);
            setElement("hard_drives", spec.hard_drives.title);
            setElement("video_graphics", spec.video_graphics.title);
            setElement("power_supply", spec.power_supply.title);
            setElement("network_connectivity", spec.network_connectivity);
            setElement("chassis_fan", spec.chassis_fan);
            setElement("expansion_slots", spec.expansion_slots);
            setElement("ports", spec.ports);
            setElement("video_connectivity", spec.video_connectivity);

        })
} else {
    //redirect to page not found

}

function setElement(elementId, data) {
    document.getElementById(elementId).innerHTML = data;
}