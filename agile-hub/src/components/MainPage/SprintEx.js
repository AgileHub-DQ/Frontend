import React, { useState } from 'react';

function SprintEx() {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleStart = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div style={{ marginLeft: '150px', marginRight: '150px', marginTop: '50px' }}>
            <h2>스프린트 시작</h2>
            <p style={{ fontSize: '20px' }}>
                1개의 이슈를 이 스프린트에 포함합니다.<br />
                필수 필드는 별표 <span style={{ color: 'red' }}>*</span>로 표시되어 있습니다.
            </p>
            <div style={{ fontSize: '20px', marginTop: '40px' }}>
                <label>스프린트 이름<span style={{ color: 'red' }}>*</span></label>
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                    style={{
                        width: '100%',
                        padding: '8px',
                        margin: '8px 0',
                        boxSizing: 'border-box',
                        height: '50px',
                        border: '3px solid #DDDFE4',
                        borderRadius: '5px'
                    }}
                />
            </div>
            <div style={{ fontSize: '20px', marginTop: '20px' }}>
                <label>시작 날짜<span style={{ color: 'red' }}>*</span></label>
                <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        margin: '8px 0',
                        boxSizing: 'border-box',
                        height: '50px',
                        border: '3px solid #DDDFE4',
                        borderRadius: '5px'
                    }}
                />
            </div>
            <div style={{ fontSize: '20px', marginTop: '20px' }}>
                <label>종료 날짜<span style={{ color: 'red' }}>*</span></label>
                <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        margin: '8px 0',
                        boxSizing: 'border-box',
                        height: '50px',
                        border: '3px solid #DDDFE4',
                        borderRadius: '5px'
                    }}
                />
            </div>
            <div style={{ fontSize: '20px', marginTop: '20px' }}>
                <label>스프린트 목표</label>
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="description"
                    style={{
                        width: '100%',
                        padding: '8px',
                        margin: '8px 0',
                        resize: 'none',
                        boxSizing: 'border-box',
                        height: '150px',
                        border: '3px solid #DDDFE4',
                        borderRadius: '5px'
                    }}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                    onClick={handleCloseModal} 
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: '#ccc',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '8px'
                    }}
                >
                    취소
                </button>
                <button 
                    onClick={handleStart} 
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '8px'
                    }}
                >
                    시작
                </button>
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '4px',
                        textAlign: 'center',
                        maxWidth: '400px',
                        width: '80%',
                    }}>
                        <p>테스트용입니다! 프로젝트 생성 먼저 해주세요.</p>
                        <button
                            onClick={handleCloseModal}
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginTop: '10px'
                            }}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SprintEx;
