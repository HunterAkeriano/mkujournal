export interface RequestSubscriber<T> {
  resolve(data: T): void
  reject(reason?: any): void
}

export interface RequestHandler<T> {
  (): Promise<T>
}

export class RequestAccumulator<T> {
  private hasRequest = false
  private subscribers = new Array<RequestSubscriber<T>>()

  public constructor(private handler: RequestHandler<T>) {}

  public async request() {
    if (this.hasRequest) {
      return await this.addSubscriber()
    }

    try {
      const data = await this.callRequest()
      this.resolveSubscribers(data)
      return data
    } catch (e) {
      this.rejectSubscribers(e)
      throw e
    }
  }

  private async addSubscriber() {
    return await new Promise<T>((resolve, reject) => {
      this.subscribers.push({ resolve, reject })
    })
  }

  private async callRequest() {
    this.hasRequest = true

    try {
      return await this.handler()
    } finally {
      this.hasRequest = false
    }
  }

  private resolveSubscribers(data: T) {
    for (const subscriber of this.subscribers) {
      subscriber.resolve(data)
    }
    this.subscribers = []
  }

  private rejectSubscribers(reason?: any) {
    for (const subscriber of this.subscribers) {
      subscriber.reject(reason)
    }
    this.subscribers = []
  }
}
