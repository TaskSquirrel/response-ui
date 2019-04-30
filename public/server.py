import signal
import zerorpc, gevent

class ResponseApi():
    def __init__(self):
        pass
    
    def echo(self, text='Connection successful!'):
        return text

def main():
    port = 6111
    addr = 'tcp://127.0.0.1:' + str(port)

    srvr = zerorpc.Server(ResponseApi())
    srvr.bind(addr)
    print('Server running on {}...'.format(addr))
    srvr.run()

    gevent.signal(signal.SIGTERM, srvr.stop)
    print('Zerorpc stopped!')

if __name__ == '__main__':
    main()
