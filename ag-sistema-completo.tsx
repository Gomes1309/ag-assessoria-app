import React, { useState } from 'react';
import { 
  User, 
  Home, 
  Upload, 
  FileText, 
  Calculator, 
  Plus, 
  Eye, 
  Building2, 
  AlertCircle, 
  CheckCircle,
  Search,
  Bell,
  Download,
  MessageCircle,
  Clock,
  Phone,
  Mail,
  Globe,
  Filter,
  Settings,
  ChevronRight
} from 'lucide-react';

const AGSistema = () => {
  const [screen, setScreen] = useState('login');
  const [userType, setUserType] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [clientTab, setClientTab] = useState('home');
  const [showModal, setShowModal] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  // Dados simulados
  const clients = [
    {
      id: 1,
      name: 'João Silva',
      cpf: '123.456.789-00',
      email: 'joao@email.com',
      phone: '(16) 99999-1111',
      status: 'Ativo',
      empresas: [
        { 
          cnpj: '12.345.678/0001-90', 
          name: 'Silva & Associados LTDA', 
          situacao: 'Ativa', 
          regime: 'Simples Nacional'
        }
      ]
    }
  ];

  const documents = [
    { id: 1, name: 'Declaração IR 2024.pdf', type: 'IR', date: '15/03/2024', size: '2.1 MB' },
    { id: 2, name: 'DAS Maio 2024.pdf', type: 'DAS', date: '20/04/2024', size: '856 KB' }
  ];

  const notifications = [
    { id: 1, title: 'Documento disponível', time: '2h atrás', read: false, type: 'document' },
    { id: 2, title: 'DAS em atraso', time: '1 dia atrás', read: false, type: 'alert' }
  ];

  const services = [
    { id: 1, name: 'Declaração de IR', desc: 'Pessoa Física e Jurídica' },
    { id: 2, name: 'Abertura de Empresa', desc: 'MEI, LTDA, SA' },
    { id: 3, name: 'Consultoria Tributária', desc: 'Planejamento fiscal' }
  ];

  // Tela de Login
  if (screen === 'login') {
    return (
      <div className="max-w-sm mx-auto bg-gray-50 min-h-screen flex items-center justify-center p-6">
        <div className="w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-xl font-bold">AG</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">AG Assessoria</h1>
            <p className="text-gray-600">Serrana/SP - Desde 1993</p>
          </div>

          {/* Opções de Login */}
          <div className="space-y-4">
            {/* Cliente */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <User className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Área do Cliente</h3>
                  <p className="text-sm text-gray-600">Documentos e serviços</p>
                </div>
              </div>
              <input
                type="text"
                placeholder="CPF ou E-mail"
                className="w-full p-3 border rounded-lg mb-3"
              />
              <input
                type="password"
                placeholder="Senha"
                className="w-full p-3 border rounded-lg mb-4"
              />
              <button 
                onClick={() => setScreen('client')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Entrar como Cliente
              </button>
            </div>

            {/* Contador */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Calculator className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold">Portal do Contador</h3>
                  <p className="text-sm text-gray-600">Gestão de clientes</p>
                </div>
              </div>
              <input
                type="text"
                placeholder="Usuário"
                className="w-full p-3 border rounded-lg mb-3"
              />
              <input
                type="password"
                placeholder="Senha"
                className="w-full p-3 border rounded-lg mb-4"
              />
              <button 
                onClick={() => setScreen('accountant')}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
              >
                Entrar como Contador
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Portal do Cliente
  if (screen === 'client') {
    return (
      <div className="max-w-sm mx-auto bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white shadow p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">AG</span>
            </div>
            <span className="font-semibold">AG Assessoria</span>
          </div>
          <button 
            onClick={() => setScreen('login')}
            className="text-gray-600 text-sm"
          >
            Sair
          </button>
        </div>

        {/* Conteúdo Principal */}
        {clientTab === 'home' && (
          <div className="p-6 space-y-6 pb-20">
            <div className="text-center">
              <h1 className="text-xl font-bold">Olá, João Silva</h1>
              <p className="text-gray-600">Bem-vindo ao seu portal</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Documentos</p>
                    <p className="text-xl font-bold">{documents.length}</p>
                  </div>
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Empresas</p>
                    <p className="text-xl font-bold">3</p>
                  </div>
                  <Building2 className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-green-500 rounded-lg p-4 text-white">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">WhatsApp Ativo</h3>
                  <p className="text-green-100 text-sm">Notificações automáticas</p>
                </div>
              </div>
            </div>

            {/* Notificações */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">🔔 Notificações</h3>
                <button 
                  onClick={() => setClientTab('notifications')}
                  className="text-blue-600 text-sm"
                >
                  Ver todas
                </button>
              </div>
              <div className="space-y-2">
                {notifications.slice(0, 2).map(notif => (
                  <div key={notif.id} className="p-3 bg-gray-50 rounded">
                    <p className="font-medium text-sm">{notif.title}</p>
                    <p className="text-xs text-gray-500">{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contato */}
            <div className="bg-gray-800 rounded-lg p-4 text-white">
              <h3 className="font-semibold mb-3">📞 Contato</h3>
              <div className="space-y-2 text-sm">
                <p>(16) 3987-2955</p>
                <p>eduardo@agassessoriaonline.com.br</p>
              </div>
            </div>
          </div>
        )}

        {/* Documentos */}
        {clientTab === 'documents' && (
          <div className="p-6 pb-20">
            <h2 className="text-xl font-bold mb-4">📄 Meus Documentos</h2>
            <div className="space-y-3">
              {documents.map(doc => (
                <div key={doc.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-gray-500">{doc.date} • {doc.size}</p>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">{doc.type}</span>
                      </div>
                    </div>
                    <Download className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Serviços */}
        {clientTab === 'services' && (
          <div className="p-6 pb-20">
            <h2 className="text-xl font-bold mb-4">🛠️ Serviços</h2>
            <div className="space-y-3">
              {services.map(service => (
                <div key={service.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.desc}</p>
                    </div>
                    <button 
                      onClick={() => alert(`Solicitação de ${service.name} enviada!`)}
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm"
                    >
                      Solicitar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notificações */}
        {clientTab === 'notifications' && (
          <div className="p-6 pb-20">
            <h2 className="text-xl font-bold mb-4">🔔 Notificações</h2>
            <div className="space-y-3">
              {notifications.map(notif => (
                <div key={notif.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-start space-x-3">
                    {notif.type === 'alert' ? 
                      <AlertCircle className="w-5 h-5 text-red-500" /> : 
                      <FileText className="w-5 h-5 text-blue-500" />
                    }
                    <div className="flex-1">
                      <h3 className="font-medium">{notif.title}</h3>
                      <p className="text-sm text-gray-500">{notif.time}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <MessageCircle className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-600">WhatsApp enviado</span>
                      </div>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t">
          <div className="flex justify-around py-2">
            {[
              { id: 'home', label: 'Início', icon: Home },
              { id: 'documents', label: 'Docs', icon: FileText },
              { id: 'services', label: 'Serviços', icon: Settings },
              { id: 'notifications', label: 'Avisos', icon: Bell }
            ].map(tab => {
              const IconComponent = tab.icon;
              const isActive = clientTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setClientTab(tab.id)}
                  className={`flex flex-col items-center py-2 px-3 ${
                    isActive ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-xs mt-1">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Portal do Contador
  if (screen === 'accountant') {
    return (
      <div className="max-w-sm mx-auto bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold">Portal do Contador</h1>
              <p className="text-purple-100 text-sm">AG Assessoria</p>
            </div>
            <button 
              onClick={() => setScreen('login')}
              className="bg-white bg-opacity-20 px-3 py-1 rounded text-sm"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white border-b">
          <div className="flex">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'clients', label: 'Clientes', icon: User },
              { id: 'upload', label: 'Upload', icon: Upload }
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center py-3 text-xs ${
                    activeTab === tab.id ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mb-1" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Clientes</p>
                      <p className="text-2xl font-bold">{clients.length}</p>
                    </div>
                    <User className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Empresas</p>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                    <Building2 className="w-8 h-8 text-green-500" />
                  </div>
                </div>
              </div>

              <div className="bg-purple-600 rounded-lg p-6 text-white">
                <h3 className="font-semibold mb-2">🤖 IA Automática</h3>
                <p className="text-purple-100 text-sm mb-4">Sistema de reconhecimento ativo</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-20 rounded p-2 text-center">
                    <div className="font-bold">94%</div>
                    <div className="text-xs">Precisão</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded p-2 text-center">
                    <div className="font-bold">156</div>
                    <div className="text-xs">Processados</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Clientes */}
          {activeTab === 'clients' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">👥 Clientes</h2>
                <button 
                  onClick={() => setShowModal('addClient')}
                  className="bg-purple-600 text-white px-4 py-2 rounded flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo</span>
                </button>
              </div>

              {clients.map(client => (
                <div key={client.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.email}</p>
                      <p className="text-sm text-gray-600">{client.phone}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                      {client.status}
                    </span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Empresas ({client.empresas.length})</span>
                      <button 
                        onClick={() => {
                          setSelectedClient(client);
                          setShowModal('addCompany');
                        }}
                        className="text-purple-600 text-sm"
                      >
                        + Adicionar
                      </button>
                    </div>
                    {client.empresas.map((empresa, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded">
                        <p className="font-medium">{empresa.name}</p>
                        <p className="text-sm text-gray-600">{empresa.cnpj}</p>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                          {empresa.situacao}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-4">🚀 Upload Inteligente</h3>
                
                <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
                  <h4 className="font-medium text-blue-800 mb-2">Como funciona:</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Arraste múltiplos PDFs</li>
                    <li>• IA extrai CNPJ automaticamente</li>
                    <li>• Identifica cliente na base</li>
                    <li>• Envia WhatsApp automático</li>
                  </ul>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Arraste os PDFs aqui</p>
                  <p className="text-gray-500 text-sm">ou clique para selecionar</p>
                </div>

                <button 
                  onClick={() => alert('📄 Processando documentos...\n\n✅ 3 PDFs processados\n📱 WhatsApps enviados!')}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg"
                >
                  Processar com IA
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modais */}
        {showModal === 'addClient' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Novo Cliente</h3>
                <button onClick={() => setShowModal(null)}>×</button>
              </div>
              <div className="space-y-3">
                <input type="text" placeholder="Nome" className="w-full p-2 border rounded" />
                <input type="text" placeholder="CPF" className="w-full p-2 border rounded" />
                <input type="email" placeholder="E-mail" className="w-full p-2 border rounded" />
                <input type="text" placeholder="Telefone" className="w-full p-2 border rounded" />
                <div className="flex space-x-2">
                  <button onClick={() => setShowModal(null)} className="flex-1 bg-gray-200 py-2 rounded">
                    Cancelar
                  </button>
                  <button 
                    onClick={() => {
                      setShowModal(null);
                      alert('Cliente cadastrado com sucesso!');
                    }}
                    className="flex-1 bg-purple-600 text-white py-2 rounded"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showModal === 'addCompany' && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Nova Empresa</h3>
                <button onClick={() => setShowModal(null)}>×</button>
              </div>
              <div className="bg-blue-50 p-3 rounded mb-4">
                <p className="text-blue-700 text-sm">Cliente: {selectedClient.name}</p>
              </div>
              <div className="space-y-3">
                <input type="text" placeholder="CNPJ" className="w-full p-2 border rounded" />
                <input type="text" placeholder="Razão Social" className="w-full p-2 border rounded" />
                <select className="w-full p-2 border rounded">
                  <option>Simples Nacional</option>
                  <option>Lucro Presumido</option>
                  <option>Lucro Real</option>
                  <option>MEI</option>
                </select>
                <div className="flex space-x-2">
                  <button onClick={() => setShowModal(null)} className="flex-1 bg-gray-200 py-2 rounded">
                    Cancelar
                  </button>
                  <button 
                    onClick={() => {
                      setShowModal(null);
                      alert('Empresa cadastrada com sucesso!');
                    }}
                    className="flex-1 bg-purple-600 text-white py-2 rounded"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default AGSistema;