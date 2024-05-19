import React from 'react';

function IssueEx() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#00FF00', marginRight: '10px' }}></div>
                <input
                    type="text"
                    placeholder="Issue Title"
                    style={{
                        flex: 1,
                        height: '40px',
                        padding: '0 10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginRight: '10px'
                    }}
                />
                <select style={{ height: '40px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="DO">DO</option>
                    <option value="PROGRESS">PROGRESS</option>
                    <option value="DONE">DONE</option>
                </select>
            </div>

            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <input type="date" style={{ flex: 1, marginRight: '10px', padding: '0 10px', height: '40px', border: '1px solid #ccc', borderRadius: '4px' }} />
                <span style={{ alignSelf: 'center' }}>~</span>
                <input type="date" style={{ flex: 1, marginLeft: '10px', padding: '0 10px', height: '40px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div style={{ display: 'flex', marginBottom: '20px' }}>
                {['기획', '디자인', '개발', '테스트', '피드백'].map((stage, index) => (
                    <div key={index} style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '10px 0',
                        margin: '0 5px',
                        borderRadius: '4px',
                        background: ['#E97373', '#945EB5', '#3FA976', '#FFBF43', '#95ADF6'][index],
                        color: 'white',
                        height: '50px',
                    }}>
                        {stage}
                    </div>
                ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="type" style={{ marginRight: '10px' }}>타입</label>
                <select id="type" style={{ height: '40px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="STORY">STORY</option>
                    <option value="TASK">TASK</option>
                </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="priority" style={{ marginRight: '10px' }}>상위 항목</label>
                <select id="priority" style={{ height: '40px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="">선택</option>
                </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <textarea
                    placeholder="설명 입력"
                    style={{
                        width: '100%',
                        height: '100px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <label htmlFor="file" style={{ marginRight: '10px' }}>이미지 파일:</label>
                <input type="file" id="file" style={{ flex: 1, display: 'inline-block' }} />
                <span style={{ marginLeft: '10px' }}>선택된 파일 없음</span>
            </div>

            <button style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'block',
                margin: '0 auto'
            }}>
                이슈 생성
            </button>
        </div>
    );
}

export default IssueEx;
